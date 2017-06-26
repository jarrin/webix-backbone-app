/**
 * Created by Jarrin on 28-5-2017.
 */
import Backbone from 'backbone'
import 'Setup/App'
import _ from 'underscore'

export default Backbone.WebixView.extend({
  el: '#app',
  config: {
    rows: [
      {
        view: 'toolbar',
        id: 'app_toolbar',
        css: 'app-toolbar',
        height: 40,
        elements: [
          {
            id: 'sidebar_toggle',
            view: 'button',
            type: 'icon',
            icon: 'bars',
            width: 37,
            align: 'left',
            css: 'sidebar_toggle',
            click: function () {
              webix.$$('main_menu').toggle()
              window.app.mainController.resize()
            }
          },
          {
            view: 'template',
            css: 'app-title',
            id: 'app_title',
            template: '#title#',
            autowidth: true
          },
          {
            id: 'toolbar_content',
            view: 'template',
            css: 'toolbar-content'
          }
        ]
      },
      {
        cols: [
          {
            view: 'sidebar',
            id: 'main_menu',
            on: {
              onItemClick: function (id) {
                window.app.router.navigate('#' + this.getItem(id).path, {trigger: true})
              }
            }
          },
          {
            id: 'main_content',
            template: ''
          }
        ]
      }
    ]
  },
  initialize () {
    // Call parent
    Backbone.WebixView.prototype.initialize.apply(this, arguments)
    if (window.app) {
      window.app.on('error', (options) => {
        options = _.extend({
          type: 'error'
        }, options)
        window.webix.message(options)
      })
    }
  }
})
