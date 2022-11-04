import toastr from 'toastr'

import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from '../pages/LoginPage.vue'
import HomePage from '../pages/HomePage.vue'
import ControlPage from '../pages/ControlPage.vue'
import ChatPage from '../pages/ChatPage.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/control',
      name: 'control',
      component: ControlPage
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (token === null || token === '') {
      toastr.warning("", "请先验证")
      next('/login')
    } else {
      next()
    }
  }
})

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router
