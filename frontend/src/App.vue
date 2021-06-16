<template>
  <div id="app">
    <NavBar></NavBar>
    
    <router-view></router-view>
    
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components:{
    NavBar
  },
  data() {
      return {
          msg: '',
      }
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
</style>