/**
 * Created by Jarrin on 28-5-2017.
 */
import 'webix'
import 'webix.css'
import 'setup'
import 'Setup/App'

import $ from 'jquery'
import Router from 'Router'
import Backbone from 'backbone'
import _ from 'underscore'
import { Base, Routable, Authentication } from 'Modules'
import MainController from 'MainController'

import options from 'App.json'
window.app.options = options
window.app = _.extend({}, window.app, Backbone.Events)
window.app.mainController = new MainController()
window.app.name = options.title

$(function () {
  window.app.mainController.register(new Base(), false, (baseController) => {
    Backbone.history.start()
    window.app.base = baseController
    window.app.router = new Router()
    window.app.authtentication = new Authentication()

    window.app.mainController.register(window.app.authtentication, true)

    // Register Routable routes
    window.app.base.view.render(() => {
      _.each(Routable, function (Module) {
        window.app.mainController.register(new Module(), true)
      })
      window.app.authtentication.checkAuth((authenticated) => {
        console.log('checkAuth, callback')
        if (authenticated) {
          window.app.router.defaultRoute()
        } else {
          window.app.router.navigate('#login', {trigger: true})
          window.app.mainController.trigger('change', 'login')
        }
      })
    })
  })
})
