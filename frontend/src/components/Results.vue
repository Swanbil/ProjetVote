<template>
  <div class="results">
    <h1>{{ title }}</h1>
    <p>Here, you can see results</p>
    
  </div>
</template>

<script>
export default {
  name: 'Results',
  data(){
    return{
      title:'Results'
    }
    
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
h1{
  text-align:center;
  margin-top:50px;
  font-weight: bold;
  margin-bottom:5%;
  
}
.results{
  text-align: center;
}
</style>