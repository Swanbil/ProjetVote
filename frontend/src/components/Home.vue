<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <button @click="getAllUsers">TEST</button>
    {{msg}}
    
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      title:'Home',
      msg:''
    }
    
  },
  methods:{
    async getAllUsers() {
      let res = await fetch('/api/users')
      var data = await res.json();
      console.log(data)
      this.msg = data.mess
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
  color: #42b983;
}
</style>
