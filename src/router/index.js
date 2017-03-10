import Vue from 'vue'
import Router from 'vue-router'
// TODO: replace me with index 
import Contact from '@/components/Contact'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Contact',
      component: Contact
    }
  ]
})
