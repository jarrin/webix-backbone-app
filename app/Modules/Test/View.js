/**
 * Created by Jarrin on 28-5-2017.
 */
import Backbone from 'backbone'
import 'Setup/App'

export default Backbone.WebixView.extend({
  name: 'Test',
  config: {
    view: 'datatable',
    columns: [
      {
        id: 'test',
        header: 'test2',
        fillspace: true
      }
    ],
    data: [{test: 'Success2!'}]
  },
  initialize () {
    // Call parent
    Backbone.WebixView.prototype.initialize.apply(this, arguments)
    console.log('init test view')
  }
})
