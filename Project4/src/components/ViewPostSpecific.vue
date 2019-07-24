<template>
  <div class="viewPostSpecific">
    <button @click="goBack">goBack</button>
    <p>{{this.Title}}</p>
    <div v-html=this.Content></div>
  </div>
</template>

<script>

import { VueEditor } from 'vue2-editor'
import { db } from '../main'

export default {
  name: 'addPost',
  data () {
    return {
      Content: '<h1>LOADING</h1>',
      Title: ''
    }
  },
  components: {
    vueEditor: VueEditor
  },
  beforeCreate: async function () {
    var path = this.$router.currentRoute.fullPath
    path = path.substr(-20)
    var title = ''
    var content = ''

    await db.collection('Posts').doc(path).get()
      .then(function (doc) {
        title = doc.data().Title
        content = doc.data().Content
      })
    this.Title = title
    this.Content = content
  },
  methods: {
    goBack () {
      this.$router.replace('../viewpost')
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