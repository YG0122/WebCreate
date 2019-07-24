<template>
  <div class="home">
    <button @click="$emit('logout-status')">Logout</button>
  </div>
</template>

<script>
// import * as firebase from 'firebase/app'
import firebase from 'firebase'
// import 'firebase/auth'
import vm from './Home'
// import Home from '@/components/Home'

// import firebase from 'firebase'
// import Login from './Login'
// import db from '../main'
export default {
  name: 'logoutButton',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      age: null,
      color: null
    }
  },
  components: {
    vm
  },
  methods: {
    logout_click () {
      const uid = this.$route.params.userid

      console.log('firebase.auth().currentUser before then : ' + firebase.auth().currentUser)

      const currentUser = firebase.auth().currentUser.email

      console.log(vm)

      firebase.auth().signOut().then(() => {
        console.log('logout: before vm.data.iflogin')

        this.vm.refresh()

        console.log('value is set to : ' + vm.data.ifLogin)
        console.log(vm)
        console.log('firebase.auth().currentUser : ' + currentUser)
        console.log('logout: before replace')

        this.$router.replace('/' + uid)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

button {
  padding: 10px 20px;
  background: #BED38E;
  color: #59754D;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}
</style>