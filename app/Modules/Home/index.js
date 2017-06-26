/**
 * Created by Jarrin on 28-5-2017.
 */

import View from 'View'
import DefaultController from 'DefaultController'
import HomeToolbar from 'Toolbar'

export default class HomeController extends DefaultController {
  constructor () {
    super(View, HomeToolbar)
    this.menu_name = 'Dashboard'
    this.name = 'home'
    this.path = 'home'
  }
}
