/**
 * Created by Jarrin on 28-5-2017.
 */
import Backbone from 'backbone'
import 'Setup/App'

export default Backbone.WebixView.extend({
  name: 'home',
  config: {
    view: 'datatable',
    columns: [
      {
        id: 'test',
        header: 'test',
        fillspace: true
      }
    ],
    url: window.app.backend + 'books/'
  },
  initialize () {
    // Call parent
    Backbone.WebixView.prototype.initialize.apply(this, arguments)
    console.log('init home view')
  }
})
