/**
 * Created by Jarrin on 28-5-2017.
 */

import $ from 'jquery'
import _ from 'lodash'
import Backbone from 'backbone'
window.$ = $
export default class MainController {
  constructor () {
    this.active_controller = null
    this.controllers = {}
    this.routable_controllers = {}
    _.bindAll(this, 'resize', 'change')
    _.extend(this, Backbone.Events)
    this.on('change', this.change)
    $(window).on('resize', _.debounce(this.resize, 250))
  }

  register (controller, routable, callback) {
    if (routable) {
      this.routable_controllers[controller.path] = controller
      if (controller.in_menu) this.addMenuItem(controller)
    } else {
      this.controllers[controller.name] = controller
    }
    if (callback) callback(controller)
  }

  addMenuItem (controller) {
    window.app.mainController.addToMenu({
      icon: controller.menu_icon,
      value: controller.menu_name,
      id: controller.name,
      path: controller.path
    })
  }

  resize () {
    _.each(this.controllers, function (controller) {
      if (controller.view) controller.view.trigger('resize')
    })
    _.each(this.routable_controllers, function (controller) {
      if (controller.view && controller.initialised) controller.view.trigger('resize')
    })
  }

  change (path) {
    console.log(path)
    if (!this.routable_controllers[path]) {
      throw new Error('FATAL: Can\'t find controller!')
    } else {
      if (this.active_controller && this.active_controller.destroy) this.active_controller.destroy()
      this.routable_controllers[path].activate()
      this.active_controller = this.routable_controllers[path]
      if (this.active_controller.in_menu) webix.$$('main_menu').select(this.routable_controllers[path].name)

      if (this.active_controller.show_toolbar) {
        webix.$$('sidebar_toggle').hide()
        $(webix.$$('app_title').$view).addClass('padding_left')
      } else {
        webix.$$('sidebar_toggle').show()
        $(webix.$$('app_title').$view).removeClass('padding_left')
      }
      this.active_controller.show_sidebar ? webix.$$('main_menu').show() : webix.$$('main_menu').hide()

      $('#app').attr('class', '').addClass('module ' + this.active_controller.name)
    }
  }
}
