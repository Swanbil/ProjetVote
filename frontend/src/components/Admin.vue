<template>
<div class="pageAdmin">
  <div class="accueilAdmin">
    <h1>{{ title }}</h1>
    <p>Here, you can see the results or manage users</p>
    <button type="button" @click="showElection()"> Gerer elections </button>
    <button @click="showVote()">Gerer les candidats</button>
    <button @click="showNews()">Gerer les news </button>
    <button @click="ShowStats()">Observer les statistiques des élections</button>
  </div>

  <div id="Election">
    <button @click="ajouterElection()">Ajouter une nouvelle élection</button>
    <button @click="SupprimerElection()">Supprimer une elections</button>
    <button @click="modifierElection()">Modifier une election </button>
  </div>
  <div id="Vote">
    <button @click="ajoutercandidat()">Ajouter un nouveau candidat</button>
    <button @click="Supprimercandidat()">Supprimer un candidat</button>
    <button @click="Modifiercandidat()">Modiier un candidat </button>
  </div>
  <div id="News">
    <button @click="AJouterNews()">Ajouter une actualité</button>
    <button @click="SupprimerNews()">Supprimer une actualité </button>
    <button @click="ModifierNews()">Modiier une actualité </button>
  </div>

   <div id="ajoutElections">
     <form @submit.prevent="ajElec()" method="POST">
          <label for="statut-select" class="elec">
            Choisir votre catégorie d'elections :
          </label>

          <select id="statut-select" v-model="categorie" class="elec">
            <option value="" disabled selected class="elec">Catégorie</option>
            <option value="presidentielle">Présidentielle</option>
            <option value="municipale">Municipale</option>
            <option value="regionale">Régionale</option>
          </select>

          <p id=datD>Selectionnez la date de début</p>
          <input type="date" v-model="date" placeholder="Date de début" required />

          <p id=datF>Selectionnez la date de fin</p>
          <input type="date" v-model="dateF" placeholder="Date de fin" required/>

          <input type="text" v-model="descri" placeholder="Entrez une descrption" required/>

          <button type="submit">Valider</button>
      </form>

  </div>

  <div id="modifElections">
    <form @submit.prevent="AffichageElec()" method="POST">

        <label for="statut-select" class="modifelec">
            Choisissez votre catégorie d'elections à modifier :
        </label>
        <select id="statut-select" v-model="categorie" class="modifelec">
          <option value="" disabled selected class="modifelec">Catégorie</option>
          <option value="presidentielle">Présidentielle</option>
          <option value="municipale">Municipale</option>
          <option value="regionale">Régionale</option>
        </select>       
    </form>

      <div classe ="affichageElec">
        <button @click="affichageElec()">Ajouter</button>
      </div>
      <div  v-for="election in elections" v-bind:key="election.idelection">
        {{election.idelection}}
        {{election.datedebut}}
        {{election.datefin}}
        {{election.description}}
        <button @click="modifieElec(election.idelection)">Modifier cette election</button>
        <div id=elmod>
          <form @submit.prevent="mdElec()" method="POST">

            <p id=datD>Selectionnez la date de début</p>
            <input type="date" v-model="date" placeholder="Date de début" required />

            <p id=datF>Selectionnez la date de fin</p>
            <input type="date" v-model="dateF" placeholder="Date de fin" required/>

            <input type="text" v-model="descri" placeholder="Entrez une descrption" required/>

            <button type="submit">Valider</button>
          </form>
        </div>
      </div>
  </div>  


</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data(){
    return{
      title:'Admin',
      date:'',
      dateF: '',
      categorie: '',
      descri: '',
      affElec : '',
      elections : [],
      modElec : '',
      currentElection : '',
    }
    
  },
  props: {
    msg: String
  },


  methods : {
    showElection(){
      document.getElementById ("Election").style.display="flex";
      document.getElementById ("Vote").style.display="none";
      document.getElementById ("News").style.display="none";


    },
    showVote(){
      document.getElementById ("Vote").style.display="flex";
      document.getElementById ("Election").style.display="none";
      document.getElementById ("News").style.display="none";

    },
    showNews(){
      document.getElementById ("Vote").style.display="none";
      document.getElementById ("Election").style.display="none";
      document.getElementById ("News").style.display="flex";

    },
    ajouterElection(){
      document.getElementById ("ajoutElections").style.display="flex";
      document.getElementById ("modifElections").style.display="none";


    },
    modifierElection(){
      document.getElementById ("modifElections").style.display="flex";
      document.getElementById ("ajoutElections").style.display="none";


    },

    //ajout election
    async ajElec(){
      console.log (this.categorie),
      await axios.post('/api/addElection', {
        date: this.date,
        dateF: this.dateF,
        categorie: this.categorie,
        descri: this.descri
      });
      /*this.$router.push("/");*/
    },

    async affichageElec() {
      console.log(this.categorie)
      const affElec= await axios.post ('/api/affElec',{
      categorie: this.categorie,
      });
      console.log(affElec.data)
      this.elections = affElec.data

    },

    modifieElec(idelection) {
      document.getElementById ("elmod").style.display="flex";
      this.currentElection=idelection
    },
    
   //modif election
    async mdElec(){
      console.log (this.categorie)
      const modElec= await axios.post('/api/modElec', {
        date: this.date,
        dateF: this.dateF,
        categorie: this.categorie,
        descri: this.descri,
        idelection : this.currentElection,
      });
      console.log(modElec.data)
      this.elections = modElec.data
    }
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
#ajoutElections{
  display : none;
}
#modifElections{
  display: none;
}
#elmod{
  display : none;
}

</style>