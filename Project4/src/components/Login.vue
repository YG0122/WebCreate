<template>
  <div class="login">
    <h3>Sign In</h3>
      <input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <button @click="login">Login</button>
      <p>
        or Sign In with Google <br>
        <button @click="socialLogin" class="social-button">
          <img alt="Google Logo" src="../assets/google-logo.png">
        </button>
      </p>
      <p>Don't you have an account? You can <router-link to="/sign-up">create one</router-link></p>
  </div> 
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.$route.params.userid == '1') {
        console.log('Login.vue/login()')
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('hello')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
      } else {
        console.log('Login.vue/login()//uid : ', this.$route.params.userid)
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace(this.$route.params.userid)
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
      }
    },
    socialLogin () {
      console.log('Login.vue/socialLogin()')
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.replace('hello')
      }).catch((err) => {
        alert('Oops. ' + err.message)
      })
    }
  }
}
</script>


<style scoped>
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
  .social-button {
    width: 75px;
    background: white;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    outline: 0;
    border: 0;
  }
  .social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  .social-button img {
    width: 100%;
  }
</style>