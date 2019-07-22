// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app
let config = {
  apiKey: 'AIzaSyDizXaLOcvPkC6HcuM7q3wa48PsE1fZpnk',
  authDomain: 'project4-8e88f.firebaseapp.com',
  databaseURL: 'https://project4-8e88f.firebaseio.com',
  projectId: 'project4-8e88f',
  storageBucket: 'project4-8e88f.appspot.com',
  messagingSenderId: '399276307732',
  appId: '1:399276307732:web:36d2104f7de320cb'
}
firebase.initializeApp(config)
export default firebase.firestore()
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
