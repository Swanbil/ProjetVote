<template>
  <div class="vote">
    <h1>{{ title }}</h1>
    <p>Here, you can see the results or manage users</p>

    <div class="election">
      <h2>Election</h2>
      <ul>
        <li><router-link :to="{ name: 'AddElection' }">Ajouter une election</router-link></li>
        <li><router-link :to="{ name: 'ModifyElection' }">Modifier une election</router-link></li>
        <li><router-link :to="{ name: 'DeleteElection' }">Supprimer une election</router-link></li>
      </ul>
    </div>
    
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