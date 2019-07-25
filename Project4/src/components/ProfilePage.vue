<template>
  <div class="profilePage">
    <p>{{this.email}}</p>
    <p>{{this.parentUid}}</p>
  </div>
</template>

<script>

import { db } from '../main'

export default {
  name: 'addPost',
  data () {
    return {
      email: '',
      parentUid: ''
    }
  },
  components: {
  },
  beforeCreate: async function () {
    const uid = this.$route.params.userid
    var i = 0
    var email
    var parentUid
    await db.collection('Users').where('uid', '==', uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (i === 0) {
            email = doc.data().email
            parentUid = doc.data().parentUid
            i++
          }
        })
      })
    this.email = email
    this.parentUid = parentUid
  },
  methods: {
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