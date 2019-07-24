<template>
  <div>
    <home2-vue></home2-vue>
    <image-upload></image-upload>
    <loginButton v-if="ifLogin === null"></loginButton>
    
    <div v-else>
      <logoutButton v-on:logout-status="refresh"></logoutButton>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
import Home2Vue from './Home2.vue'
import ImageUpload from './ImageUpload.vue'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      age: null,
      color: null,
      ifLogin: null
    }
  },
  created: function () {
    console.log('created of home.vue')
    this.$data.ifLogin = firebase.auth().currentUser
    console.log('created of home.vue::: firebase.auth().currentUser', firebase.auth().currentUser)
    console.log('msg: ', this.$data.msg)
  },
  updated: function () {
    console.log('updated of home.vue')
    this.$data.ifLogin = firebase.auth().currentUser
  },
  components: {
    Home2Vue,
    // Login,
    ImageUpload,
    LoginButton,
    LogoutButton
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    id () {
      console.log('id : ' + this.$route.params.userid)
    },
    refresh: function () {
      console.log('refresh start')
      const curUser = firebase.auth().currentUser

      firebase.auth().signOut().then(() => {
        console.log(curUser)
        this.ifLogin = null
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
  background: #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}
</style>