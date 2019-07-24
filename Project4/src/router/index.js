import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:userid/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const currentUser = firebase.auth().currentUser
        console.log('path: ' + this.path)
        if (currentUser) next('hello')
        next()
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/:userid/sign-up',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: (to, from, next) => {
        const currentUser = firebase.auth().currentUser
        if (currentUser) next('hello')
        next()
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '*',
      redirect: '/login',
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/:userid',
      name: 'Userid',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  console.log('current user :', currentUser)

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log('requiresAuth :', requiresAuth)

  if (currentUser) console.log('parent uid :', currentUser.email.substring(0, 28))

  console.log('beforeEach this.$router:', this.$router)

  if (requiresAuth && !currentUser) {
    console.log('going uid + login')
    next('login')
  } else {
    console.log('going next')
    next()
  }
})/* else if (!requiresAuth && currentUser) {
    console.log('going uid')
    next('hello')
  } */

export default router
