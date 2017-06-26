/**
 * Created by Jarrin on 28-5-2017.
 */
import Backbone from 'backbone'
import 'Setup/App'

export default Backbone.WebixView.extend({
  name: 'login',
  config: {
    view: 'window',
    id: 'login_window',
    position: 'center',
    hidden: false,
    head: 'Inloggen A.U.B',
    body: {
      view: 'form',
      id: 'login_form',
      width: 400,
      elements: [
        {
          view: 'text',
          label: 'Gebruiker',
          id: 'username',
          name: 'username',
          labelWidth: 100
        },
        {
          view: 'text',
          type: 'password',
          label: 'Wachtwoord',
          name: 'password',
          labelWidth: 100
        },
        {
          margin: 5,
          cols: [
            {width: 50},
            {
              view: 'button',
              value: 'Login',
              type: 'form',
              on: {
                onItemClick () {
                  webix.$$('login_window').controller.doLogin.call(this, arguments)
                }
              }
            },
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
