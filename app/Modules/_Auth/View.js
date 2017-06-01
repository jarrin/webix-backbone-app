/**
 * Created by Jarrin on 28-5-2017.
 */
import Backbone from 'backbone'
import 'Setup/App'

export default Backbone.WebixView.extend({
  name: 'login',
  config: {
    view: 'window',
    position: 'center',
    hidden: false,
    head: 'Inloggen A.U.B',
    body: {
      view: 'form',
      id: 'log_form',
      width: 400,
      elements: [
        {view: 'text', label: 'Gebruiker', name: 'email', labelWidth: 100, id: 'focus_me'},
        {view: 'text', type: 'password', label: 'Wachtwoord', name: 'password', labelWidth: 100},
        {
          margin: 5,
          cols: [
            {width: 50},
            {view: 'button', value: 'Login', type: 'form'},
            {width: 50}
          ]
        }
      ]
    }
  },
  initialize () {
    // Call parent
    Backbone.WebixView.prototype.initialize.apply(this, arguments)
    console.log('init login view', this)
  }
})
