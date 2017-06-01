/**
 * Created by Jarrin on 28-5-2017.
 */

import View from './View'

import DefaultController from 'DefaultController'
export default class HomeController extends DefaultController {
  constructor () {
    super(View)
    this.menu_name = 'Test'
    this.menu_icon = 'book'
    this.path = 'test'
    this.name = 'test'
  }
}

// default {
//   path: 'home',
//   name: 'home',
//   View: View
// }
