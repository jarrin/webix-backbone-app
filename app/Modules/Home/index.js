/**
 * Created by Jarrin on 28-5-2017.
 */

import View from './View'
import DefaultController from 'DefaultController'

export default class HomeController extends DefaultController {
  constructor () {
    super(View)
    this.menu_name = 'Dashboard'
    this.name = 'home'
    this.path = 'home'
  }
}

// default {
//   path: 'home',
//   name: 'home',
//   View: View
// }
