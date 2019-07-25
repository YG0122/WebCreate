<template>
  <div class="home2">
    <p>
    <button>Wowowowowow
    </button>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home2',
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
        this.$router.replace('login')
      })
    },
    id () {
      console.log('id : ' + this.$route.params.userid)
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