<template>
  <div class="sign-up">
    <h4>아이디</h4>
    <input type="text" v-model="email" placeholder="Email"><br>
    <!-- <input v-model="email" type="text"></input> -->
    <h4>패스워드</h4>
    <input type="password" v-model="password" placeholder="Password"><br>
    <!-- <input v-model="password" type="password"></input> -->
    <div>
    <button @click="SignUp()">Sign Up</button></div>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    SignUp () {
      const uid = this.$route.params.userid
      if (uid === '1') {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(
            (user) => {
              this.$router.replace('../hello')
            },
            (err) => {
              alert('Oops. ' + err.message)
            }
          )
      } else {
        firebase.auth().createUserWithEmailAndPassword(uid + '_' + this.email, this.password)
          .then(
            (user) => {
              this.$router.replace('../' + uid)
            },
            (err) => {
              alert('Oops. ' + err.message)
            }
          )
      }
    }
  }
}
</script>


<style scoped>
  .signUp {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
