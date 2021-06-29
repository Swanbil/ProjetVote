<template>
  <div class="statistique">
    <h1>{{ title }}</h1>
    <div id="showElection">
        <form @submit.prevent="displayElec()" method="POST">

            <label for="statut-select" class="modifelec">
                Choisissez votre catégorie d'elections :
            </label>
            <select id="statut-select" v-model="el.categorie" class="modifelec">
            <option value="" disabled selected class="modifelec">Catégorie</option>
            <option value="presidentielle">Présidentielle</option>
            <option value="municipale">Municipale</option>
            <option value="regionale">Régionale</option>
            </select>
            <button>Valider</button>       
        </form>
    </div>
    <div classe ="affichageElec">
    
      <div  v-for="election in elections" v-bind:key="election.idelection">
            <input type="radio" v-model="currentElection" :id="election.id" :value="election.idelection"
            checked>
            <label :for="election.id">
                <p class=id>ci-joins l'id de l'election :
                {{election.idelection}}
                </p>
                <p class=dateD>Date de début :
                {{election.datedebut}}
                </p>
                <p class=dateF>Date de fin :
                {{election.datefin}}
                </p>
                <p class=descri>description de l'élection :
                {{election.description}}
                </p>
            </label>
            <button type="submit" @click="ShowStatistiques()">Inspectez cette election</button>

      </div>
  </div> 
  <div v-for="candidat in stat" :key="candidat.nomc" class="response">
      {{ candidat.nomc }}:{{ candidat.count }}
        
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

      elections : [],
      currentElection : '',
      response:'',
      stat :[],
    };
  },
  methods:{
      //show elections
    async displayElec() {
      this.response=''
      const affElec= await axios.post ('/api/affElec',{
      categorie: this.el.categorie,
      });
      this.elections = affElec.data
    },
        
   //show stats
    async ShowStatistiques(){
      this.el.idelection = this.currentElection
      const ShowStatistique= await axios.post('/api/showStats', {
        election:this.el
      });
      this.stat = ShowStatistique.data.stats
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
</style>