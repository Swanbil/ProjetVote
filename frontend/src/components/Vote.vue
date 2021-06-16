<template>
  <div class="vote">
    <h1>{{ title }}</h1>
    <p>Here, you can vote</p>
    
  </div>
</template>

<script>
export default {
  name: 'Vote',
  data(){
    return{
      title:'Vote'
    }
    
  },
  props: {
    msg: String
  }
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