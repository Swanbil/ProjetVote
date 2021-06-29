<template>
  <div class="candidat">
    <h1>{{ title }}</h1>
    <div id="modifCandidat">
    <form @submit.prevent="displayCandidat()" method="POST">

        <label for="statut-select" class="modifelec">
            Choisissez l'élection dont les candidat ont participé :
        </label>
        <select id="statut-select" v-model="el.categorie" class="modifelec">
          <option value="" disabled selected class="modifelec">Catégorie</option>
          <option value="presidentielle">Présidentielle</option>
          <option value="municipale">Municipale</option>
          <option value="regionale">Régionale</option>
        </select>
        <button>Valider</button>       
    </form>

    <div classe ="affichageCanddiat">
      </div>
      <div  v-for="candidat in candidats" v-bind:key="candidat.idcandidat">
        <input type="radio" v-model="currentCandidat" :id="candidat.id" :value="candidat.idcandidat"
         checked>
        <label :for="candidat.id">
          {{candidat.nomc}}
          {{candidat.prenomc}}
          {{candidat.emailc}}
          {{candidat.partipolitique}}
          {{candidat.descriptifprojet}}

        </label>

      </div>
      <div id=camod>
        <form @submit.prevent="modCandidat()" method="POST">
          <input type="text" v-model="ca.nomco" placeholder="Entrez un son nom" required>
          <input type="text" v-model="ca.prenomco" placeholder="Entrez un son prenom" required>
          <input type="text" v-model="ca.emailco" placeholder="Entrez un son mail" required>
          <input type="text" v-model="ca.partipolitiqueco" placeholder="Entrez un son partie" required>
          <input type="text" v-model="ca.descriptifprojetco" placeholder="Entrez un son projet" required>

          <button type="submit" @click="modCandidat()">Modifier cet candidat</button>
          
        </form>
        <button @click="deleteCandidat()">Supprimer cet candidat</button>
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
      title: "Modifier un candidat",
      ca:{
        idcandidat:'',
        nomc:'',
        prenomc: '',
        emailc: '',
        partiepolitique: '',
        descriptifprojet: ''
      },
      el:{
        idelection:'',
        date:'',
        dateF: '',
        categorie: '',
        descri: ''
      },
      elections : [],
      currentElection : '',
      candidats : [],
      currentCandidat : '',
      response:''
    };
  },
  methods:{
    async displayCandidat() {
      this.response=''
      const affCandidat= await axios.post ('/api/affCandidat',{
      });
      this.candidats = affCandidat.data
    },
        
   //modif election
    async modCandidat(){
      this.ca.idcandidat = this.currentCandidat
      const modCandidat= await axios.post('/api/modCandidat', {
        candidat:this.ca
      });
      this.response = modCandidat.data.mess
    },
    //supprimer election
    async deleteCandidat(){
      console.log(this.currentCandidat)
      const supCandidat= await axios.post('/api/supCandidat', {
        idcandidat : this.currentCandidat,
      });
      this.response = supCandidat.data.mess
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