<template>
<div class="pageAdmin">
  <div class="accueilAdmin">
    <h1>{{ title }}</h1>
    <p>Here, you can see the results or manage users</p>
      <div class="menu px-3 py-2">
        <div class="block">
          <h3>Election</h3>
          <li><router-link :to="{ name: 'AddElection' }">Ajouter une election</router-link></li>
          <li><router-link :to="{ name: 'ModifyElection' }">Modifier une election</router-link></li>
        </div>
        <div class="block">
          <h3>Candidats</h3>
          <li><router-link :to="{ name: 'AddElection' }">Ajouter une election</router-link></li>
          <li><router-link :to="{ name: 'ModifyElection' }">Modifier une election</router-link></li>
        </div>
        <div class="block">
          <h3>Statistiques</h3>
          <li><router-link :to="{ name: 'AddElection' }">Ajouter une election</router-link></li>
          <li><router-link :to="{ name: 'ModifyElection' }">Modifier une election</router-link></li>
        </div>
        
      </div>
    
  </div>
</div>

</template>

<script>

export default {
  name: "Admin",
  data() {
    return {
      title: "Admin",
    };
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 2%;
}
.admin {
  text-align: center;
}
.menu{
  display:flex;
  flex-direction: column;
  margin-bottom: 5%;
  
}
.block{
  margin-top:3%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  

  
}
li{
  list-style: none;
  
}
h3{
  margin-bottom:2%;
  
}
</style>