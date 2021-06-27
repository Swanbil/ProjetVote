<template>
  <div class="elections">
    <h1>{{ title }}</h1>
    <div id="ajoutElections">
     <form @submit.prevent="addElec()" method="POST">
          <label for="statut-select" class="elec">
            Choisir votre catégorie d'elections :
          </label>

          <select id="statut-select" v-model="election.categorie" class="elec">
            <option value="" disabled selected class="elec">Catégorie</option>
            <option value="presidentielle">Présidentielle</option>
            <option value="municipale">Municipale</option>
            <option value="regionnale">Régionale</option>
          </select>

          <p id=datD>Selectionnez la date de début</p>
          <input type="date" v-model="election.date" placeholder="Date de début" required />

          <p id=datF>Selectionnez la date de fin</p>
          <input type="date" v-model="election.dateF" placeholder="Date de fin" required/>

          <input type="text" v-model="election.descri" placeholder="Entrez une descrption" required/>

          <button type="submit">Valider</button>
      </form>
  </div>

  <div class="response">
      {{ response }}
  </div>
  
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddElection',
  data(){
    return{
      title:'Ajouter une election',
      election:{
        date:'',
        dateF: '',
        categorie: '',
        descri: ''
      },
      response:''
      
    }
    
  },
  methods:{
      async addElec(){
      const response = await axios.post('/api/addElection', {
        election:this.election
      });
      this.response = response.data.mess
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