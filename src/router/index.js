import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import ShoppingMail from '@/components/pages/ShoppingMail' //主页
import Register from '@/components/pages/Register' //注册
import Login from '@/components/pages/Login' //登录
import Goods from '@/components/pages/Goods' //商品详情
import CategoryList from '@/components/pages/CategoryList' //商品列表页
import Cart from '@/components/pages/Cart' //商品列表页

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        { path: '/', name: 'ShoppingMail', component: ShoppingMail },
        { path: '/categoryList', name: 'CategoryList', component: CategoryList },
        { path: '/cart', name: 'Cart', component: Cart }
      ]
    },
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/goods', name: 'Goods', component: Goods },
  ]
})
