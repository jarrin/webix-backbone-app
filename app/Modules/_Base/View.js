/**
 * Created by Jarrin on 28-5-2017.
 */
import Backbone from 'backbone'
import 'Setup/App'

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
            template: '#title#'
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
  }
})
