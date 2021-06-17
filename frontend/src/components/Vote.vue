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
h1{
  text-align:center;
  margin-top:50px;
  font-weight: bold;
  margin-bottom:5%;
  
}
.vote{
  text-align: center;
}
</style>