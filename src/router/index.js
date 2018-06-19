import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from '@/components/pages/ShoppingMail'
import Register from '@/components/pages/Register'


Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      name: 'ShoppingMail',
      component: ShoppingMail
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
