// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import VueSweetAlert from 'vue-sweetalert'
import _ from 'lodash'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(VueSweetAlert)

import 'bootstrap/dist/css/bootstrap.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
