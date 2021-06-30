<template>
<div class="pageAdmin">
  <div class="accueilAdmin">
    <h1>{{ title }}</h1>
      <div class="menu px-3 py-2">
        
        <div class="block">
          <h3>Élections</h3>
          <li><router-link :to="{ name: 'AddElection' }">Ajouter une élection</router-link></li>
          <li><router-link :to="{ name: 'ModifyElection' }">Modifier/supprimer une élection</router-link></li>
        </div>

        <div class="block">
          <h3>Candidats</h3>
          <li><router-link :to="{ name: 'AddCandidat' }">Ajouter un candidat</router-link></li>
          <li><router-link :to="{ name: 'ModifyCandidat' }">Modifier/Supprimer un candidat</router-link></li>
        </div>

        <div class="block">
          <h3>Votants</h3>
          <li><router-link :to="{ name: 'AddVotant' }">Ajouter un votant</router-link></li>
          <li><router-link :to="{ name: 'ModifyVotant' }">Modifier/Supprimer un votant</router-link></li>
        </div>
        
        <div class="block">
          <h3>News</h3>
          <li><router-link :to="{ name: 'AddNews' }">Ajouter une news</router-link></li>
          <li><router-link :to="{ name: 'ModifyNews' }">Modifier/Supprimer une news</router-link></li>
        </div>

        <div class="block">
          <h3>Statistiques</h3>
          <li><router-link :to="{ name: 'ShowStatistique' }">Voir les résultats</router-link></li>
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
  align-items: center;
  
}
.block{
  margin-top:3%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid #245fb8;
  background-color: rgb(243, 243, 243);
  padding-top: 5%;
  padding-bottom: 5%;
  width: 50%;
  border-radius: 20px;
}

.block:hover{
  background-color: rgba(189, 189, 189, 0.466);

}


li{
  list-style: none;
  font-size: 130%;
  margin-top: 2%  
}
h3{
  margin-bottom:2%;
  
}
</style>