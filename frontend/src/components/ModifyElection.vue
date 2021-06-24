<template>
  <div class="election">
    <h1>{{ title }}</h1>
    <p>Here, you can modify an election</p>
    
  </div>
</template>

<script>
export default {
  name: 'ModifyElection',
  data(){
    return{
      title:'Modifier une election'
    }
    
  },
  
}
</script>

<style scoped>
h1{
  text-align:center;
  margin-top:50px;
  font-weight: bold;
  margin-bottom:5%;
  
}
.election{
  text-align: center;
}
</style>