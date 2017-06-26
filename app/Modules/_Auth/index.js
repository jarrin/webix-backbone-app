/**
 * Created by Jarrin on 31-5-2017.
 */

import Backbone from 'backbone'
import { LocalStorage } from 'backbone.localstorage'
import DefaultController from 'DefaultController'
import View from './View'
import './Style.scss'
import $ from 'jquery'
import _ from 'underscore'

let AuthModel = Backbone.Model.extend({
  localStorage: new LocalStorage('authentication'),
  defaults: {
    id: undefined,
    auth_token: null,
    expires: null,
    username: null,
    full_name: null
  }
})

export default class AuthenticationController extends DefaultController {
  constructor () {
    super(View)
    this.model = new AuthModel({id: 'default'})
    this.in_menu = false
    this.show_sidebar = false
    this.show_toolbar = false
    this.path = 'login'
    this.name = 'authentication'
    this.authenticated = false
    _.bindAll(this, 'doLogin')
  }

  checkAuth (_check) {
    console.log('checking')
    function fail () {
      window.app.router.navigate('#' + this.path, {trigger: true})
      _check(false)
    }

    this.model.fetch({
      success: (data) => {
        console.log('fetch success!')
        data = data.toJSON()
        console.log(data.auth_token)
        if (data.auth_token) {
          // Setup jQuery and Webix requests
          $.ajaxSetup({
            headers: {'Authorization': 'Bearer ' + data.auth_token}
          })
          window.webix.attachEvent('onBeforeAjax',
            function (mode, url, dataDummy, request, headers, files, promise) {
              headers['Authorization'] = 'Bearer ' + data.auth_token
            }
          )
          _check(true)
        } else {
          fail.call(this)
        }
      },
      error: () => {
        fail.call(this)
      }
    })
  }

  doLogin () {
    $.post({
      url: 'login',
      data: webix.$$('login_form').getValues()
    }).then((response) => {
      this.model.save({
        id: 'default',
        auth_token: response.token,
        expires: response.expires,
        full_name: response.name,
        username: response.user
      }, {
        success: function () {
          window.app.router.defaultRoute()
        },
        error: function () {
          console.log(arguments)
        }
      })
    })
  }
}
