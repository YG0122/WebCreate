import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Home from '@/components/Home'
import AddPost from '@/components/AddPost'
import ViewPost from '@/components/ViewPost'
import ViewPostSpecific from '@/components/ViewPostSpecific'
import ProfilePage from '@/components/ProfilePage'

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
      path: '/:userid/addpost',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/:userid/viewpost',
      name: 'ViewPost',
      component: ViewPost
    },
    {
      path: '/:userid/viewpost/:postid',
      name: 'ViewPostSpecific',
      component: ViewPostSpecific
    },
    {
      path: '/:userid/profile',
      name: 'ProfilePage',
      component: ProfilePage
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
})

export default router
