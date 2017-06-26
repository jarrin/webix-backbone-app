/**
 * Created by Jarrin on 28-5-2017.
 */
import Backbone from 'backbone'
import $ from 'jquery'
import _ from 'underscore'
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
  },
  render (callback) {
    console.log('render', this)
    Backbone.WebixView.__super__.render.apply(this, arguments)
    if (callback) callback()
  },
  resize () {
    this.root.resize()
  },
  afterRender () {
    if (this.controller) this.root.controller = this.controller
  }
  // destroy () {
  //   console.log('default destroy')
  // }

})

$.ajaxSetup({
  crossDomain: true,
  error (response, errorType, errorMessage) {
    if (window.app) {
      let text = response.responseJSON ? response.responseJSON.message : errorMessage
      window.app.trigger('error', {
        text
      })
    }
  },
  beforeSend (xhr, options) {
    options.url = window.app.backend + options.url
  }
})
webix.attachEvent('onLoadError', function (messageOrEvent, source, lineno, colno, error) {
  console.log('login again', arguments)
  goToLogin()
})
function goToLogin () {
  window.app.router.navigate('#login', {trigger: true})
  window.app.mainController.trigger('change', 'login')
}
