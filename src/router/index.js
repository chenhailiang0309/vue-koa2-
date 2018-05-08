import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from '@/components/pages/ShoppingMail'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMail',
      component: ShoppingMail
    }
  ]
})
