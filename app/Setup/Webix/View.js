/**
 * Created by Jarrin on 30-5-2017.
 */
import Backbone from 'backbone'
import $ from 'jquery'
import _ from 'underscore'

let cfg = {
  use_id: false
}

function _startExtLoad (cal) {
  cal._backbone_loading = true
  cal.callEvent('onBeforeLoad', [])
  cal.blockEvent()
}
function _finishExtLoad (cal) {
  cal.unblockEvent()
  cal._backbone_loading = false
  cal.refresh()
}

webix.attachEvent('onUnSyncUnknown', function (wData, bData) {
  let whandlers = wData._sync_events
  let handlers = wData._sync_backbone_events

  for (let i = 0; i < whandlers.length; i++) { wData.detachEvent(whandlers[i]) }

  for (let i = 0; i < handlers.length; i++) { bData.off.apply(bData, handlers[i]) }
})

webix.attachEvent('onSyncUnknown', function (wData, bData, config) {
  if (config) cfg = config
  if (cfg.get && typeof cfg.get === 'string') { cfg.get = cfg.get.split(',') }

  // remove private properties
  function sanitize (ev) {
    if (cfg.use_id) { return ev }

    let obj = {}
    for (let key in ev) {
      if (key !== 'id') { obj[key] = ev[key] }
    }

    return obj
  }

  function _getId (model) {
    return cfg.use_id ? model.id : model.cid
  }

  function datareset (wData, bData) {
    let data = []
    for (let i = 0; i < bData.models.length; i++) {
      let model = bData.models[i]
      let cid = _getId(model)
      let ev = copymodel(model)
      ev.id = cid
      data.push(ev)
    }
    wData.clearAll()
    wData._parse(data)
  }

  function copymodel (model) {
    if (cfg.get) {
      let data = {}
      for (let i = 0; i < cfg.get.length; i++) {
        let key = cfg.get[i]
        data[key] = model.get(key)
      }
      return data
    }
    return model.toJSON()
  }

  let handlers = [
    ['change', function (model, info) {
      let cid = _getId(model)
      let ev = wData.pull[cid] = copymodel(model)
      ev.id = cid

      if (wData._scheme_update) { wData._scheme_update(ev) }
      wData.refresh(ev.id)
    }],
    ['remove', function (model, changes) {
      let cid = _getId(model)
      if (wData.pull[cid]) { wData.remove(cid) }
    }],
    ['add', function (model, changes) {
      let cid = _getId(model)
      if (!wData.pull[cid]) {
        let ev = copymodel(model)
        ev.id = cid
        if (wData._scheme_init) { wData._scheme_init(ev) }
        wData.add(ev)
      }
    }],
    ['reset', function (model, changes) {
      datareset(wData, bData)
    }],
    ['request', function (obj) {
      if (obj instanceof Backbone.Collection) { _startExtLoad(wData) }
    }],
    ['sync', function (obj) {
      if (obj instanceof Backbone.Collection) { _finishExtLoad(wData) }
    }],
    ['error', function (obj) {
      if (obj instanceof Backbone.Collection) { _finishExtLoad(wData) }
    }]
  ]

  for (let i = 0; i < handlers.length; i++) { bData.bind.apply(bData, handlers[i]) }

  let whandlers = [
    wData.attachEvent('onAfterAdd', function (id) {
      if (!bData.get(id)) {
        let data = sanitize(wData.getItem(id))
        let model = new bData.model(data)

        let cid = _getId(model)
        if (cid !== id) { this.changeId(id, cid) }

        bData.add(model)
        bData.trigger('webix:add', model)
      }
      return true
    }),
    wData.attachEvent('onDataUpdate', function (id) {
      let ev = bData.get(id)
      let upd = sanitize(wData.getItem(id))

      ev.set(upd)
      bData.trigger('webix:change', ev)

      return true
    }),
    wData.attachEvent('onAfterDelete', function (id) {
      let model = bData.get(id)
      if (model) {
        bData.trigger('webix:remove', model)
        bData.remove(id)
      }
      return true
    })
  ]

  wData._sync_source = bData
  wData._sync_events = whandlers
  wData._sync_backbone_events = handlers

  if (bData.length || wData.count()) {
    datareset(wData, bData)
  }
})

Backbone.WebixView = Backbone.View.extend({
  // starting from backbone 1.1, this.options is not saved automatically
  initialize: function (options) {
    Backbone.WebixView.__super__.initialize.apply(this, arguments)
    console.log('Init WebixView (' + this.name + ')')
    _.bindAll(this, 'resize')
    this.on('resize', this.resize)  },
  render: function () {
    if (this.beforeRender) this.beforeRender.apply(this, arguments)

    let config = this.config || this.options.config
    let el

    if (!config.view || !webix.ui.hasMethod(config.view, 'setPosition')) {
      el = window.$ ? $(this.el)[0] : this.el
      // clear previous content if any
      if (el && !el.config) el.innerHTML = ''
    }

    let ui = webix.copy(config)
    ui.$scope = this
    this.root = webix.ui(ui, el)

    if (this.afterRender) this.afterRender.apply(this, arguments)
    return this
  },
  destroy: function () {
    if (this.root) this.root.destructor()
  },
  getRoot: function () {
    return this.root
  },
  getChild: function (id) {
    if (!this.root.$$) webix.message('You need to set isolate property for top view')
    return this.root.$$(id)
  }
})
