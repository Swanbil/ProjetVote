<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="TestSachour Vue.js App"/>
    <button @click="getAllUsers">TEST</button>
    {{msg}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
      return {
          msg: '',
      }
  },
  methods: {
    async getAllUsers() {
      let res = await fetch('/api/users')
      var data = await res.json();
      console.log(data)
      this.msg = data.mess
      
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>