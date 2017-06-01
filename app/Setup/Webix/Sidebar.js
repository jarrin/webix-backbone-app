/**
 * Created by Jarrin on 28-5-2017.
 */

import 'webix'
import './Sidebar.css'
webix.protoUI({
  name: 'sidebar',
  defaults: {
    titleHeight: 40,
    type: 'sideBar',
    activeTitle: true,
    select: true,
    scroll: false,
    collapsed: true,
    collapsedWidth: 41,
    position: 'left',
    width: 250,
    mouseEventDelay: 10
  },
  $init: function (config) {
    this.$ready.push(this._initSidebar)
    this.$ready.push(this._initContextMenu)
  },

  on_context: {},
  on_mouse_move: {},
  _initSidebar: function () {
    this._fullWidth = this.config.width
    this.attachEvent('onBeforeOpen', function (id) {
      if (!this.config.multipleOpen) { this.closeAll() }
      return !this.config.collapsed
    })
    this.attachEvent('onItemClick', function (id, ev, node) {
      if (!this.getItem(id) || !this.getItem(id)['data'] || !this.getItem(id)['data'].length) {
        // return
      }
      if (this.getPopup() && !this.getPopup().config.hidden) { ev.showpopup = true }
      if (webix.env.touch) { this._showPopup(id, node) }
    })
    this.attachEvent('onBeforeSelect', function (id) {
      if (!this.getItem(id).$count) {
        let selected = this.getSelectedId()
        if (selected && id !== selected) {
          let parentId = this.getParentId(selected)

          this.removeCss(parentId, 'webix_sidebar_selected')
        }
        return true
      }
      return false
    })
    this.attachEvent('onAfterSelect', function (id) {
      let parentId = this.getParentId(id)
      this.addCss(parentId, 'webix_sidebar_selected')
      let title = this.getPopupTitle()

      title.callEvent('onMasterSelect', [id])
    })
    this.attachEvent('onMouseMove', function (id, ev, node) {
      this._showPopup(id, node)
    })

    if (this.config.collapsed) { this.collapse() }
  },
  _showPopup: function (id, node) {
    if (this.config.collapsed) {
      let popup = this.getPopup()

      if (popup) {
        let title = this.getPopupTitle()
        if (title) {
          this._updateTitle(id)
        }
        let list = this.getPopupList()
        if (list) {
          this._updateList(id)
        }
        let x = (this.config.position === 'left' ? this.config.collapsedWidth : -popup.config.width)
        popup.show(node, {x: x, y: -1})
      }
    }
  },
  _updateTitle: function (id) {
    let title = this.getPopupTitle()
    title.masterId = id
    title.parse(this.getItem(id))
    let selectedId = this.getSelectedId()
    if (selectedId && this.getParentId(selectedId) === id) {
      webix.html.addCss(title.$view, 'webix_sidebar_selected', true)
    } else {
      webix.html.removeCss(title.$view, 'webix_sidebar_selected')
    }

    if (selectedId === id) {
      webix.html.addCss(title.$view, 'webix_selected', true)
    } else {
      webix.html.removeCss(title.$view, 'webix_selected')
    }
  },
  _updateList: function (id) {
    let list = this.getPopupList()
    list.masterId = id
    let selectedId = this.getSelectedId()
    let data = [].concat(webix.copy(this.data.getBranch(id)))
    list.unselect()
    if (data.length) {
      list.show()
      list.data.importData(data)
      if (list.exists(selectedId)) { list.select(selectedId) }
    } else { list.hide() }
  },
  _initContextMenu: function () {
    let config = this.config
    let popup

    if (config.popup) {
      popup = webix.$$(config.popup)
    }
    if (!popup) {
      let dirClassName = (config.position === 'left' ? 'webix_sidebar_popup_left' : 'webix_sidebar_popup_right')
      let popupConfig = {
        view: 'popup',
        css: 'webix_sidebar_popup ' + dirClassName,
        autofit: false,
        width: this._fullWidth - this.config.collapsedWidth,
        borderless: true,
        padding: 0,
        body: {
          rows: [
            {
              view: 'template',
              borderless: true,
              css: 'webix_sidebar_popup_title',
              template: function (a, b, c) {
                let id = b.masterId
                return webix.$$('main_menu').getItem(id)['value']
              },
              height: this.config.titleHeight + 2,
              on: {
                onMasterSelect: function (id) {
                  let master = this.getTopParentView().master
                  if (master && master.getParentId(id) === this.masterId) {
                    webix.html.addCss(this.$view, 'webix_sidebar_selected', true)
                  }
                  if (master.config.collapsed && master.getItem(id).$level === 1) {
                    webix.html.addCss(this.$view, 'webix_selected', true)
                  }
                }
              },
              onClick: {
                webix_template: function () {
                  let id = this.masterId
                  let master = this.getTopParentView().master
                  if (!master.getItem(id).$count) { master.select(id) }
                }
              }
            },
            {
              view: 'list',
              select: true,
              borderless: true,
              css: 'webix_sidebar_popup_list',
              autoheight: true,
              on: {
                onAfterSelect: function (id) {
                  this.getTopParentView().master.select(id)
                }
              }
            }
          ]
        }
      }
      webix.extend(popupConfig, config.popup || {}, true)
      popup = webix.ui(popupConfig)
      popup.master = this
    }
    popup.attachEvent('onBeforeShow', function () {
      return config.collapsed
    })
    let master = this
    let h = webix.event(document.body, 'mousemove', function (e) {
      let trg = e.target || e.srcElement
      if (!popup.config.hidden && !popup.$view.contains(trg) && !master.$view.firstChild.contains(trg)) {
        popup.hide()
      }
    })
    this.attachEvent('onDestruct', function () {
      if (webix.removeEvent) { webix.removeEvent(h) }
      if (popup) { popup.destructor() }
    })
    config.popupId = popup.config.id
  },
  getPopup: function () {
    return webix.$$(this.config.popupId)
  },
  getPopupTitle: function () {
    let popup = this.getPopup()
    return popup.getBody().getChildViews()[0]
  },
  getPopupList: function () {
    let popup = this.getPopup()
    return popup.getBody().getChildViews()[1]
  },
  position_setter: function (value) {
    let newPos = value
    let oldPos = value === 'left' ? 'right' : 'left'

    webix.html.removeCss(this.$view, 'webix_sidebar_' + oldPos)
    webix.html.addCss(this.$view, 'webix_sidebar_' + newPos, true)

    let popup = this.getPopup()
    if (popup) {
      let popupEl = popup.$view
      webix.html.removeCss(popupEl, 'webix_sidebar_popup_' + oldPos)
      webix.html.addCss(popupEl, 'webix_sidebar_popup_' + newPos, true)
    }
    return value
  },
  collapse: function () {
    this.define('collapsed', true)
  },
  expand: function () {
    this.define('collapsed', false)
  },
  toggle: function () {
    let collapsed = !this.config.collapsed
    this.define('collapsed', collapsed)
  },
  collapsed_setter: function (value) {
    let width

    if (!value) {
      width = this._fullWidth
    } else {
      width = this.config.collapsedWidth
      this.closeAll()
    }

    if (!value) {
      this.type.collapsed = false
      webix.html.addCss(this.$view, 'webix_sidebar_expanded', true)
    } else {
      this.type.collapsed = true
      webix.html.removeCss(this.$view, 'webix_sidebar_expanded')
    }

    this.define('width', width)
    this.resize()

    return value
  }
}, webix.ui.tree)

webix.type(webix.ui.tree, {
  name: 'sideBar',
  height: 'auto',
  css: 'webix_sidebar',
  template: function (obj, common) {
    if (common.collapsed) { return common.icon(obj, common) }
    return common.arrow(obj, common) + common.icon(obj, common) + '<span>' + obj.value + '</span>'
  },
  arrow: function (obj, common) {
    let html = ''
    for (let i = 1; i <= obj.$level; i++) {
      if (i === obj.$level && obj.$count) {
        let className = 'webix_sidebar_dir_icon webix_icon fa-angle-' + (obj.open ? 'down' : 'left')
        html += '<span class=\'' + className + '\'></span>'
      }
    }
    return html
  },
  icon: function (obj, common) {
    if (obj.icon) { return '<span class=\'webix_icon webix_sidebar_icon fa-' + obj.icon + '\'></span>' }
    return ''
  }
})
