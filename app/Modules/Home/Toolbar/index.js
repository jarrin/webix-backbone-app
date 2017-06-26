/**
 * Created by Jarrin on 5-6-2017.
 */

import DefaultToolbar from 'Classes/DefaultToolbar'
import View from 'View'

export default class HomeToolbar extends DefaultToolbar {
  constructor (controller) {
    super(controller, View)
    this.name = 'HomeToolbar'
  }
}
