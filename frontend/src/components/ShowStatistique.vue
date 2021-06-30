<template>
  <div class="statistique">
    <h1>{{ title }}</h1>
    <div id="stats">
    <div id="showElection">
        <form @submit.prevent="displayElec()" method="POST">

            <label for="statut-select" class="modifelec">
                Choisir la catégorie d'élections :
            </label>
            <select id="statut-select" v-model="el.categorie" class="modifelec">
            <option value="" disabled selected class="modifelec">Catégorie</option>
            <option value="presidentielle">Présidentielle</option>
            <option value="municipale">Municipale</option>
            <option value="regionale">Régionale</option>
            </select>
            <button id="validerBouton">Valider</button> 
        </form>
    </div>
    <div classe ="affichageElec">
    
      <div  v-for="election in elections" v-bind:key="election.idelection" id ="resultStat">
            <input type="radio" v-model="currentElection" :id="election.id" :value="election.idelection"
            checked>
            <label :for="election.id">
                <p class=dateD>Date de début :
                {{election.datedebut}}
                </p>
                <p class=dateF>Date de fin :
                {{election.datefin}}
                </p>
                <p class=descri>Description de l'élection :
                {{election.description}}
                </p>
            </label>
            <button type="submit" id= "elecCheck" @click="ShowStatistiques()">Résultats des votes</button>

      </div>
  </div> 
  <div v-show="hasElec" v-for="candidat in stat" :key="candidat.nomc" class="response">
      {{ candidat.nomc }}:{{ candidat.count }}  
  </div> 
</div>    
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "showElection",
  data() {
    return {
      title: "observez les statistiques des élections",
      el:{
        idelection:'',
        date:'',
        dateF: '',
        categorie: '',
        descri: ''
      },
      hasElec:false,
      elections : [],
      currentElection : '',
      response:'',
      stat :[],
    };
  },
  methods:{
      //show elections
    async displayElec() {
      this.hasElec = false
      const affElec= await axios.post ('/api/affElec',{
      categorie: this.el.categorie,
      });
      this.elections = affElec.data
    },
        
   //show stats
    async ShowStatistiques(){
    
      this.el.idelection = this.currentElection
      const ShowStatistique= await axios.post('/api/showStats', {
        election:this.el.idelection
      });
      this.stat = ShowStatistique.data.stats
      this.hasElec = true
      console.log(this.stat)
    },
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
  margin-top:5%;
  margin-right:30%;
  margin-left:30%;
}
.response {
  margin-top:5%;
  margin-right:30%;
  margin-left:30%;
  text-align: center;
  background-color: #8ac57b;
  font-weight: bold;
}
.id{
    background-color: #af9b6f;
}

.modifelec{
  display:flex;
  flex-direction: column;
  margin: auto;
  padding: auto;
}

#stats{
  margin-top:3%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid #245fb8;
  background-color: rgb(243, 243, 243);
  padding-top: 5%;
  padding-bottom: 5%;
  width: 40%;
  border-radius: 20px;
  margin: auto;
  padding: auto;
}

#validerBouton{
  background-color: rgb(15, 151, 26);
  margin-bottom: 5%;
  margin-top: 3%
}

button{
  margin: auto;
  padding: 2%;
  border-radius: 7px;
  justify-content: center;
  margin-top: 2%;
  color: cornsilk;
  font-weight: bold;
  background-color: #929292;
}

#resultStat{
  display:flex;
  flex-direction: column;
}

input{
  margin-top:2%;
  margin-bottom: 2%
}
</style>