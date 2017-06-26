/**
 * Created by Jarrin on 28-5-2017.
 */
import Backbone from 'backbone'

export default Backbone.Router.extend({
  routes: {
    '': 'defaultRoute',
    ':module(/*subroute)': 'invokeModule',
    '*notFound': 'notFoundRoute'
  },
  defaultRoute () {
    console.log('triggering default route')
    this.navigate('home', {trigger: true})
    window.app.mainController.trigger('change', 'home')
  },
  invokeModule (module, route) {
    console.log('invoke ' + module)
    window.app.mainController.trigger('change', module)
  }
})
