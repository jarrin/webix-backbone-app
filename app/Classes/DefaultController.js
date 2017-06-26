/**
 * Created by Jarrin on 28-5-2017.
 */
// import $ from 'jquery'

export default class DefaultController {
  constructor (View, Toolbar) {
    console.log(arguments)
    this.initialised = false
    this.name = 'defaultName'
    this.menu_name = 'defaultName'
    this.in_menu = true
    this.show_toolbar = true
    this.show_sidebar = true
    this.path = ''
    this.view = null
    this.toolbar = null
    this.ViewClass = View
    this.ToolbarClass = Toolbar
  }

  activate () {
    if (!this.view) this.view = new this.ViewClass({controller: this})
    // if (!this.toolbar) this.toolbar = new this.ToolbarClass({controller: this})
    console.log(this.toolbar)
    this.view.el = webix.$$('main_content').$view
    this.view.render()
    // this.toolbar.render(webix.$$('toolbar_content').$view)
    this.initialised = true
  }

  destroy () {
    console.log('destroy ' + this.name, this)
    if (this.view) {
      this.view.destroy()
      this.view = null
    }
    if (this.toolbar) {
      this.toolbar.destroy()
      this.toolbar = null
    }
    this.initialised = false
  }
}
