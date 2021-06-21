<template>
<div class="PageAdmin">
  <div class="AccueilAdmin">
    <h1>{{ title }}</h1>
    <p>Here, you can see the results or manage users</p>
    <button type="button" @click="ShowElection()"> Gerer elections </button>
    <button @click="ShowVote()">Gerer les votants</button>
    <button @click="ShowNews()">Gerer les news </button>
    <button @click="ShowStats()">Observer les statistiques des élections</button>
  </div>

  <div id="Election">
    <button @click="AJouterElection()">Ajouter une nouvelle élection</button>
    <button @click="SupprimerElection()">Supprimer une elections</button>
    <button @click="ModifierElection()">Modiier une election </button>
  </div>
  <div id="Vote">
    <button @click="AJouterVotant()">Ajouter un nouveau votant</button>
    <button @click="SupprimerVotant()">Supprimer un votant</button>
    <button @click="ModifierVotant()">Modiier un votant </button>
  </div>
  <div id="News">
    <button @click="AJouterNews()">Ajouter une actualité</button>
    <button @click="SupprimerNews()">Supprimer une actualité </button>
    <button @click="ModifierNews()">Modiier une actualité </button>
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
  },


  methods : {
    ShowElection(){
      document.getElementById ("Election").style.display="flex";
      document.getElementById ("Vote").style.display="none";
      document.getElementById ("News").style.display="none";


    },
    ShowVote(){
      document.getElementById ("Vote").style.display="flex";
      document.getElementById ("Election").style.display="none";
      document.getElementById ("News").style.display="none";

    },
    ShowNews(){
      document.getElementById ("Vote").style.display="none";
      document.getElementById ("Election").style.display="none";
      document.getElementById ("News").style.display="flex";


    },
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
#Election{
  display : none;
}
#Vote{
  display : none;
}
#News{
  display : none;
}

</style>