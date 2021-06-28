<template>
  <div class="Candidat">
    <h1>{{ title }}</h1>
    <div id="ajoutCandidat">
     <form @submit.prevent="addCandidat()" method="POST">

        <input type="text" v-model="candidat.nomc" placeholder="Entrez le nom du candidat" required/>
        <input type="text" v-model="candidat.prenomc" placeholder="Entrez le prenom du candidat" required/>
        <input type="email" v-model="candidat.emailc" placeholder="Entrez l'email du candidat" required/>
        <input type="text" v-model="candidat.partipolitique" placeholder="indiquez son partie politique" required/>
        <input type="text" v-model="candidat.descriptifprojet" placeholder="un bref descriptif du projet" required/>

        <button type="submit">Valider</button>
      </form>
  </div>
  <div id="modifElections">
    <form @submit.prevent="displayElec()" method="POST">

        <label for="statut-select" class="modifelec">
            Choisissez votre catégorie d'elections auquel participe le candidat :
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
    </div>

  <div class="response">
      {{ response }}
  </div>
  
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddCandidat',
  data(){
    return{
      title:'Ajouter un votant',

      el:{
        idelection:'',
        date:'',
        dateF: '',
        categorie: '',
        descri: ''
      },
      elections : [],
      currentElection : '',
      currentCandidat : '',

      candidat:{
        idcandidat:'',
        nomc:'',
        prenomc: '',
        emailc: '',
        partipolitique: '',
        descriptifprojet : '',
      },
      response:''
      
    }
    
  },
  methods:{
      async addCandidat(){
        this.el.idelection = this.currentElection
        this.candidat.idcandidat = this.currentCandidat
        const response = await axios.post('/api/addCandidat', {
            candidat:this.candidat,
            election:this.el
        });
        this.response = response.data.mess
    },

    async displayElec() {
      this.response=''
      const affElec= await axios.post ('/api/affElec',{
      categorie: this.el.categorie,
      });
      this.elections = affElec.data
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
.elections{
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