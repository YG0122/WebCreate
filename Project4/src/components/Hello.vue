<template>
  <div class="hello">
    <button @click="logout">Logout</button>
    <button @click="webpage">WebPage</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      age: null,
      color: null
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('1/login')
      })
    },
    webpage () {
      let self = this
      var user1 = firebase.auth().currentUser
      var uid
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          uid = user1.uid
          console.log('uid: ' + uid)
          self.$router.replace(uid)
        } else {
          // No user is signed in.
        }
      })
    }
  }
}
</script>

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