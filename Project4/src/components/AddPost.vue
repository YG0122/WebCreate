<template>
  <div class="addPost">
    <input v-model="title" class="post-add-title-input" name = "Title" placeholder="Title" type="text"/>
    <vueEditor v-model="content"></vueEditor>
    <button @click="confirm">confirm</button>
    <button @click="goBack">goBack</button>
  </div>
</template>

<script>

import { VueEditor } from 'vue2-editor'
import { db } from '../main'
import firebase from 'firebase'

export default {
  name: 'addPost',
  data () {
    return {
      content: '<h1>Some initial content</h1>',
      title: 'title'
    }
  },
  components: {
    vueEditor: VueEditor
  },
  methods: {
    confirm () {
      const currentUser = firebase.auth().currentUser

      const date = new Date()
      var formatDate =
        date.getFullYear() + '/' +
        String(date.getMonth() + 1).padStart(2, '0') + '/' +
        String(date.getDate()).padStart(2, '0') + ' ' +
        String(date.getHours()).padStart(2, '0') + ':' +
        String(date.getMinutes()).padStart(2, '0') + ':' +
        String(date.getSeconds()).padStart(2, '0')

      const path = this.$router.currentRoute.fullPath

      db.collection('Posts').add({Title: this.$data.title, Content: this.$data.content, Writer: currentUser.email, Date: date, FormatDate: formatDate, ParentUid: path.substr(1, path.length - 9)})
      console.log('this router: ', this.$router.currentRoute.fullPath.substr(1, this.$router.currentRoute.fullPath.length - 9))
      this.$router.replace('./viewpost')
    },
    goBack () {
      this.$router.replace('./viewpost')
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