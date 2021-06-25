<template>
  <div class="election">
    <h1>{{ title }}</h1>
    <div id="modifElections">
    <form @submit.prevent="displayElec()" method="POST">

        <label for="statut-select" class="modifelec">
            Choisissez votre catégorie d'elections à modifier :
        </label>
        <select id="statut-select" v-model="el.categorie" class="modifelec">
          <option value="" disabled selected class="modifelec">Catégorie</option>
          <option value="presidentielle">Présidentielle</option>
          <option value="municipale">Municipale</option>
          <option value="regionale">Régionale</option>
        </select>
        <button>Valider</button>       
    </form>

    <div classe ="affichageElec">
      </div>
      <div  v-for="election in elections" v-bind:key="election.idelection">
        <input type="radio" v-model="currentElection" :id="election.id" :value="election.idelection"
         checked>
        <label :for="election.id">
          {{election.idelection}}
          {{election.datedebut}}
          {{election.datefin}}
          {{election.description}}
        </label>

      </div>
      <div classe ="affichageVotant">
      </div>
      <div  v-for="votant in votants" v-bind:key="votant.idutilisateur">
        <input type="radio" v-model="currentvotant" :id="votant.id" :value="votant.idutilisateur"
         checked>
        <label :for="votant.id">
          {{votant.idutilisateur}}
          {{votant.nomv}}
          {{votant.prenomv}}
          {{votant.emailv}}
          {{votant.numelec}}
          {{votant.password}}
          {{votant.dejavote}}
        </label>

      </div>
      <div id=vomod>
            <input type="text" v-model="votant.nomv" placeholder="Entrez le nom du votant" required/>
            <input type="text" v-model="votant.prenomv" placeholder="Entrez le prenom du votant" required/>
            <input type="email" v-model="votant.emailv" placeholder="Entrez l'email du votant" required/>
            <input type="text" v-model="votant.numelec" placeholder="Entrez le numero electeur du votant" required/>
            <input type="text" v-model="votant.password" placeholder="Entrez le mdp du votant" required/>
            <button type="submit" @click="modVotant()">Modifier ce votant</button>
            <button @click="deleteElec()">Supprimer cette election</button>
        </div>
  </div> 
  <div class="response">
      {{ response }}
  </div> 
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModifyElection",
  data() {
    return {
      title: "Modifier une election",
      el:{
        idelection:'',
        date:'',
        dateF: '',
        categorie: '',
        descri: ''
      },
      vo:{
        idutilisateur:'',
        nomv:'',
        prenomv: '',
        emailv: '',
        numelec: '',
        password : '',
        dejavote : ''
      },
      votants : [],
      currentvotant : '',
      elections : [],
      currentElection : '',
      response:''
    };
  },
  methods:{
    async displayElec() {
      this.response=''
      const affElec= await axios.post ('/api/affElec',{
      categorie: this.el.categorie,
      });
      this.elections = affElec.data
    },

  async displayVotant() {
      this.response=''
      const affVotant= await axios.post ('/api/affVotant',{
      categorie: this.el.categorie,
      });
      this.votants = affVotant.data
    }, 
   //modif votant
    async modVotant(){
      this.vo.idutilisateur = this.currentvotant
      const modVotant= await axios.post('/api/modVotant', {
        votant:this.vo
      });
      this.response = modVotant.data.mess
    },
    //supprimer Votants
    async deleteVotant(){
      console.log(this.currentvotant)
      const supVotant= await axios.post('/api/supVotant', {
        idutilisateur : this.currentvotant,
      });
      this.response = supVotant.data.mess
    }
  }
  };
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 5%;
}
.election {
  text-align: center;
}
.response {
  margin-top:5%;
  margin-right:30%;
  margin-left:30%;
  text-align: center;
  background-color: #8ac57b;
  font-weight: bold;
}
</style>