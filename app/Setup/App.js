/**
 * Created by Jarrin on 28-5-2017.
 */
import Backbone from 'backbone'
// import $ from 'jquery'
import _ from 'lodash'
import 'webix'
import 'webix-backbone'
import './Webix/Skin'
import './Webix/Sidebar'

Backbone.WebixView = window.WebixView.extend({
  initialize (options) {
    _.bindAll(this, 'resize')
    this.on('resize', this.resize)
    if (options && options.controller) {
      this.controller = options.controller
    }
    console.log(this)
  },
  render (callback) {
    Backbone.WebixView.__super__.render.apply(this, arguments)
    if (callback) callback()
  },
  resize: function () {
    this.root.resize()
  },
  afterRender () {
    console.log('after render', this)
    if (this.controller) this.root.controller = this.controller
  }
})
