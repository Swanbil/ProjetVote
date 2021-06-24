<template>
  <div class="election">
    <h1>{{ title }}</h1>
    <p>Here, you can delete an election</p>
    
  </div>
</template>

<script>
export default {
  name: 'DeleteElection',
  data(){
    return{
      title:'Supprimer une election'
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