<template>
  <div class="hello">
    <button @click="logout">Logout</button>
    <button @click="webpage">WebPage</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

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
    async webpage () {
      let self = this
      var user1 = firebase.auth().currentUser
      const uid = user1.uid
      var has = 0

      await db.collection('emailUidPair').where('email', '==', user1.email)
        .get()
        .then(function (querySnapshot) {
          if (!querySnapshot.empty) {
            has = 1
          }
        })
      if (has === 0) {
        await db.collection('emailUidPair').add({ email: user1.email, uid: uid })
      }
      self.$router.replace(uid)
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
  background: #BED38E;
  color: #59754D;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}
</style>