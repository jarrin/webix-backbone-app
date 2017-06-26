/**
 * Created by Jarrin on 5-6-2017.
 */

export default class DefaultToolbar {
  constructor (controller, View) {
    this.name = 'DefaultToolbar'
    this.controller = controller
    this.ViewClass = View
    console.log(this.controller, this)
  }

  render (el) {
    console.log('render TB', this.name)
    this.view = new this.ViewClass()
    this.view.el = el
    this.view.render()
  }

  destroy () {
    if (this.view) this.view.destroy()
  }
}
