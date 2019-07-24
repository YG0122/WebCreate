<template>
  <div class="home">
    <button @click='login_click'>Login</button>
  </div>
</template>

<script>
// import firebase from 'firebase'
// import Login from './Login'
// import db from '../main'
export default {
  name: 'loginButton',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      age: null,
      color: null
    }
  },
  methods: {
    login_click () {
      const uid = this.$route.params.userid
      console.log('uid: ', uid)
      this.$router.replace('/' + uid + '/login')
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