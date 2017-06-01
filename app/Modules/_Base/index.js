/**
 * Created by Jarrin on 28-5-2017.
 */

import View from './View'
import './Style.scss'
import Backbone from 'backbone'

export default class Base {
  constructor () {
    this.name = 'base'

    let MenuModel = Backbone.Model.extend({
      defaults: {
        icon: 'dashboard',
        id: null,
        title: '',
        path: 'home',
        data: []
      }
    })
    let MenuCollection = Backbone.Collection.extend({
      model: MenuModel
    })
    this.menu_collection = new MenuCollection()

    this.view = new View()
    this.view.afterRender = function () {
      webix.$$('main_menu').sync(this.menu_collection, {use_id: true})
      webix.$$('app_title').setValues({title: window.app.options.title})
    }.bind(this)

    window.app.mainController.addToMenu = function (options) {
      console.log('add', options)
      this.menu_collection.add(new MenuModel(options))
    }.bind(this)

    // this.view.render()
  }
}
