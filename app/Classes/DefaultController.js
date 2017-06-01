/**
 * Created by Jarrin on 28-5-2017.
 */
// import $ from 'jquery'

export default class DefaultController {
  constructor (View) {
    this.initialised = false
    this.name = 'defaultName'
    this.menu_name = 'defaultName'
    this.in_menu = true
    this.show_toolbar = true
    this.show_sidebar = true
    this.path = ''
    this.view = null
    this.ViewClass = View
  }

  activate () {
    if (!this.view) this.view = new this.ViewClass({controller: this})
    this.view.el = webix.$$('main_content').$view
    this.view.render()
    this.initialised = true
  }

  destroy () {
    console.log('destroy ' + this.name, this)
    if (this.view) this.view.destroy()
    this.initialised = false
  }
}
