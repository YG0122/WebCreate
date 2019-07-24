// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app
let config = {
  apiKey: 'AIzaSyBZAgeYo7Zz7Fmf4ahAsMawAnS6VqKFmro',
  authDomain: 'fir-tutorial-2e5d7.firebaseapp.com',
  databaseURL: 'https://fir-tutorial-2e5d7.firebaseio.com',
  projectId: 'fir-tutorial-2e5d7',
  storageBucket: 'fir-tutorial-2e5d7.appspot.com',
  messagingSenderId: '973205446638',
  appId: '1:973205446638:web:9ac91ea6db8aca53'
}
firebase.initializeApp(config)
console.log('just initialized')
export const db = firebase.firestore()

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
})
