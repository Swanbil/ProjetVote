<template>
  <div class="vote">
    <h1>{{ title }}</h1>
    <p>Here</p>
    
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data(){
    return{
      title:'Admin'
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
.admin{
  text-align: center;
}
</style>