<template>
    <div class="profile-page">
      <div class="profilePage">
        <br><br><br><br><br><br><br><br>
        <p>Email: <br>{{this.email}}</p>
        <p>Belongs to: <br>
          <a v-if="this.parentUid !== '1'" :href='this.parentUrl'>http://143.248.39.68:8080/{{this.parentUid}}
          </a>
          <a v-else :href='this.parentUrl'>http://143.248.39.68:8080/mainpage
          </a>
        </p>

        <p>Created page:
          <a :href="this.url">{{this.url}}</a>
        </p>
        
      </div>
    </div>
</template>

<script>

import { db } from '../main'

export default {
  name: 'addPost',
  data () {
    return {
      email: '',
      parentUid: '',
      url: '',
      parentUrl: ''
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

    console.log('uid: ', parentUid)
    if (parentUid === '1') {
      this.parentUrl = 'http://143.248.39.68:8080/mainpage'
    } else {
      this.parentUrl = 'http://143.248.39.68:8080/' + this.parentUid + '/viewpost2'
    }

    var siteuid
    i = 0
    var has

    await db.collection('emailUidPair').where('email', '==', this.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (i === 0) {
            siteuid = uid
            i++
          }
        })
        if (!querySnapshot.empty) {
          has = 1
        }
      })
    if (has === 1) {
      this.url = 'http://143.248.39.68:8080/' + siteuid
    }
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

p {
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: rgb(255, 255, 255);
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

div.profile-page{
  background-image: url("../images/22578F4B57AB03A131.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  margin: 100px 30% 0 30%;
  padding: 0 0 0 0;
  border: 2px solid #e8e9eb;
  box-shadow: #e8e9eb;
  border-radius: 1em;
  height: 706px;
}



.profile-inner{
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
}

.profile-section1{
    font-family: 'NanumSquare', sans-serif;
    width: 38%;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
}

.profile-section2{
    width: 62%;
    padding-top : 1.7rem;
    padding-left: 0.5rem;
    overflow-y: hidden;
}

.profile-section2:hover{
    scroll-behavior: smooth;
    overflow: overlay;
}

.profile-img{
    width: 100%;
    height: 100%;
}

.profile-personal-box{
    width: 100rem;
    margin: 1.5rem 0rem 1rem 0rem;
    padding-top : 1rem;
    padding-bottom: 1rem;
    border-bottom: rgb(255, 255, 255) 1px solid;
}

.profile-personal-id{
    font-family: 'GyeonggiTitleM', sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    color: rgb(255, 255, 255);
}

.profile-personal-info{
    margin-bottom: 0.6rem;
    font-size: 1rem; 
    color: rgb(255, 255, 255);  
}

.profile-personal-icon{
    font-size: 1rem;
    margin-right: 1rem;
    color: rgb(255, 255, 255);  
}


.profile-personal-mailbtn{
    margin: 1rem 0rem 1rem 0rem;
    width: 15rem;
    height: 2.5rem;
    background-color: white;
    border-radius: 15px;
    border: #F88181 0.15rem solid;
    color: #F88181;
    font-weight: bold;

    -moz-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    -webkit-transition: all .2s ease-in;
    transition: all .2s ease-in;

}

.profile-personal-mailbtn:hover{
    background-color: #F88181;
    color: white;
}

.profile-section2-title{
    margin-bottom: 1rem;
    font-family: 'GyeonggiTitleM', sans-serif;
    font-size: 1.1rem;
    font-weight: bold;
    color: rgb(255, 255, 255);
}


.communities-page{
    padding-top:10rem;
}



.ptop{
    padding-top:10rem;
}


.temp{
    padding-top: 10rem;
}

</style>