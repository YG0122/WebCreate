<template>
  <div class="sign-up">
    <h4>Sign Up</h4>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <br>
    <button @click="SignUp">Sign Up</button><br><br>
    <p>Go back to 
      <br><br>
      <button class ='button small' @click="login">Login</button>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

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
      const email = this.email
      const password = this.password
      if (uid === '1') {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(
            (user) => {
              db.collection('Users').add({ email: email, uid: firebase.auth().currentUser.uid, parentUid: '1' })
              this.$router.replace('../mainpage')
            },
            (err) => {
              alert('Oops. ' + err.message)
            }
          )
      } else {
        firebase.auth().createUserWithEmailAndPassword(uid + '_' + email, password)
          .then(
            (user) => {
              db.collection('Users').add({ email: email, uid: firebase.auth().currentUser.uid, parentUid: uid })
              this.$router.replace('../' + uid)
            },
            (err) => {
              alert('Oops. ' + err.message)
            }
          )
      }
    },
    login () {
      this.$router.replace('./login')
    }
  }
}
</script>


<style scoped>

  div{
    background-image: url("../images/22578F4B57AB03A131.jpg");
    background-size: 100% auto;
    background-repeat: no-repeat;
    margin: 0 30% 0 30%;
    padding: 5rem 0 10rem 0;
    border: 2px solid #e8e9eb;
    box-shadow: #e8e9eb;
    border-radius: 1em;
  }

  h4 {
    color: #e7e9eb;
    font-size: 2em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  p {
    color: #e7e9eb;
    font-size: 1em;
    margin-top: 40px;
    font-style: italic;
  }
  .sign-up {
    margin-top: 100px;
  }

  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }

  	input[type="submit"],
	input[type="reset"],
	input[type="button"],
	button,
	.button {
		-moz-appearance: none;
		-webkit-appearance: none;
		-ms-appearance: none;
		appearance: none;
		-moz-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
		-webkit-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
		-ms-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
		transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
		border: 0;
		border-radius: 0;
		cursor: pointer;
		display: inline-block;
		font-family: "Source Sans Pro", Helvetica, sans-serif;
		font-size: 0.8rem;
		font-weight: 900;
		letter-spacing: 0.075em;
		height: 3rem;
		line-height: 3rem;
		padding: 0 2rem;
		text-align: center;
		text-decoration: none;
		text-transform: uppercase;
		white-space: nowrap;
  }

		input[type="submit"].icon:before,
		input[type="reset"].icon:before,
		input[type="button"].icon:before,
		button.icon:before,
		.button.icon:before {
			margin-right: 0.5rem;
		}

		input[type="submit"].icon.solo,
		input[type="reset"].icon.solo,
		input[type="button"].icon.solo,
		button.icon.solo,
		.button.icon.solo {
			position: relative;
			width: 4rem;
			height: 4rem;
			line-height: 4rem;
			border-radius: 4rem;
			text-indent: 4rem;
			overflow: hidden;
			padding: 0;
			white-space: nowrap;
		}

			input[type="submit"].icon.solo:before,
			input[type="reset"].icon.solo:before,
			input[type="button"].icon.solo:before,
			button.icon.solo:before,
			.button.icon.solo:before {
				position: absolute;
				display: block;
				top: 0;
				left: 0;
				width: inherit;
				height: inherit;
				line-height: inherit;
				font-size: 1.25rem;
				margin-right: 0;
				text-align: center;
				text-indent: 0;
			}

		input[type="submit"].fit,
		input[type="reset"].fit,
		input[type="button"].fit,
		button.fit,
		.button.fit {
			width: 100%;
		}

		input[type="submit"].small,
		input[type="reset"].small,
		input[type="button"].small,
		button.small,
		.button.small {
			font-size: 0.9rem;
			height: 2.5rem;
			line-height: 2.5rem;
			padding: 0 1rem;
		}

		input[type="submit"].large,
		input[type="reset"].large,
		input[type="button"].large,
		button.large,
		.button.large {
			font-size: 0.9rem;
			height: 3.5rem;
			line-height: 3.5rem;
			padding: 0 2.75rem;
		}

		@media screen and (max-width: 980px) {

			input[type="submit"],
			input[type="reset"],
			input[type="button"],
			button,
			.button {
				font-size: 0.9rem;
				height: 3.25rem;
				line-height: 3.25rem;
			}

				input[type="submit"].large,
				input[type="reset"].large,
				input[type="button"].large,
				button.large,
				.button.large {
					font-size: 1rem;
					height: 3.75rem;
					line-height: 3.75rem;
				}

		}

		input[type="submit"].disabled, input[type="submit"]:disabled,
		input[type="reset"].disabled,
		input[type="reset"]:disabled,
		input[type="button"].disabled,
		input[type="button"]:disabled,
		button.disabled,
		button:disabled,
		.button.disabled,
		.button:disabled {
			pointer-events: none;
			opacity: 0.25;
		}

	input[type="submit"],
	input[type="reset"],
	input[type="button"],
	button,
	.button {
		background-color: transparent;
		box-shadow: inset 0 0 0 2px #e8e9eb;
		color: #e7e9eb !important;
	}

		input[type="submit"]:hover,
		input[type="reset"]:hover,
		input[type="button"]:hover,
		button:hover,
		.button:hover {
			box-shadow: inset 0 0 0 2px #18bfef;
			color: #18bfef !important;
		}

		input[type="submit"].primary,
		input[type="reset"].primary,
		input[type="button"].primary,
		button.primary,
		.button.primary {
			background-color: #212931;
			box-shadow: none;
			color: #ffffff !important;
		}

			input[type="submit"].primary:hover,
			input[type="reset"].primary:hover,
			input[type="button"].primary:hover,
			button.primary:hover,
			.button.primary:hover {
				background-color: #18bfef;
      }
      

  /* button {
    padding: 10px 20px;
    background: #BED38E;
    color: #59754D;
    font-weight: bold;
    border: none;
    border-radius: 22px;
    outline: 0;
    cursor: pointer;
  } */
  /* p {
    margin-top: 40px;
    font-size: 13px;
  } */
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
  /* .signUp {
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
  } */
</style>
