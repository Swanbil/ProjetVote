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
      <div id=elmod>
        <form @submit.prevent="modElec()" method="POST">
          <p id=datD>Selectionnez la date de début</p>
          <input type="date" v-model="el.date" placeholder="Date de début" required >
          <p id=datF>Selectionnez la date de fin</p>
          <input type="date" v-model="el.dateF" placeholder="Date de fin" required>
          <input type="text" v-model="el.descri" placeholder="Entrez une descrption" required>
          <button type="submit" @click="modElec()">Modifier cette election</button>
          <button @click="deleteElec()">Supprimer cette election</button>
        </form>
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
        
   //modif election
    async modElec(){
      this.el.idelection = this.currentElection
      const modElec= await axios.post('/api/modElec', {
        election:this.el
      });
      this.response = modElec.data.mess
    },
    //supprimer election
    async deleteElec(){
      console.log(this.currentElection)
      const supElec= await axios.post('/api/supElec', {
        idelection : this.currentElection,
      });
      this.response = supElec.data.mess
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