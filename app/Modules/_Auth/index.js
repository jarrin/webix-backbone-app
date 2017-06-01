/**
 * Created by Jarrin on 31-5-2017.
 */

import DefaultController from 'DefaultController'
import View from './View'
import './Style.scss'
export default class AuthenticationController extends DefaultController {
  constructor () {
    super(View)
    this.in_menu = false
    this.show_sidebar = false
    this.show_toolbar = true
    this.path = 'login'
    this.name = 'authentication'
    this.authenticated = false
  }
}
