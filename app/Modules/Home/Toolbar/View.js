/**
 * Created by Jarrin on 5-6-2017.
 */
import Backbone from 'backbone'

export default Backbone.WebixView.extend({
  name: 'home_toolbar',
  config: {
    cols: [
      {
        view: 'button',
        value: 'Add'
      }
    ]
  },
  initialize () {
    // Call parent
    Backbone.WebixView.prototype.initialize.apply(this, arguments)
    console.log('init tb view', this)
  }
})
