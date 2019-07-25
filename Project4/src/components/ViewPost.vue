<template>
  <div class="viewPost">
    <button @click="createPost">createPost</button>
    <button @click="backHome">backHome</button>
    <table width="100%" className="table table-striped community-table">
      <thead>
          <tr>
              <th width="5%" scope="col">#</th>
              <th width="50%" scope="col">TITLE</th>
              <th width="23%" scope="col">WRITTEN BY</th>
              <th width="22%" scope="col">CREATED AT</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in this.posts" :key="index">
          <td>{{index + 1}}</td>
          <td>
            <a @click="toPost(row.id)">{{row.data().Title}}</a>
          </td>
          <td>
            <a @click="toProfile(row.data().Writer)">{{row.data().Writer}}</a>
          </td>
          <td>{{row.data().FormatDate}}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>

import { db } from '../main'
import ViewPostSpecific from './ViewPostSpecific'

export default {
  name: 'addPost',
  data () {
    return {
      posts: []
    }
  },
  components: {
    ViewPostSpecific
  },
  created: async function () {
    const path = this.$router.currentRoute.fullPath
    var postList = []
    console.log(path.substr(1, path.length - 10))
    await db.collection('Posts').where('ParentUid', '==', path.substr(1, path.length - 10))
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(doc => {
          postList.push(doc)
        })
      })
    postList.sort(function (a, b) {
      return a.data().FormatDate < b.data().FormatDate ? -1 : a.data().FormatDate > b.data().FormatDate ? 1 : 0
    })
    this.posts = postList
    console.log('posts: ', this.posts)
  },
  methods: {
    async toPost (id) {
      this.$router.replace('./viewpost/' + id)
    },
    async toProfile (email) {
      var uid
      var i = 0
      await db.collection('Users').where('email', '==', email).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (i === 0) {
              uid = doc.data().uid
              i++
            }
          })
        })
      this.$router.replace('../' + uid + '/profile')
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    createPost () {
      this.$router.replace('./addpost')
    },
    backHome () {
      this.$router.replace('.')
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
  color: rgb(36, 151, 36);
  font-weight: bold
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