<template>
  <div class="elections">
    <h1>{{ title }}</h1>
    <p>Here, you can add an election</p>
    
  </div>
</template>

<script>
export default {
  name: 'AddElection',
  data(){
    return{
      title:'Ajouter une election'
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