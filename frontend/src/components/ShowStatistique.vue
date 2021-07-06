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
  <div class="graph" v-show="hasElec">
      <Chart class="chart" :def="def" :data="stat"></Chart>
  </div>
</div>    
</div>
</template>

<script>
import axios from "axios";
import Chart from 'vue-chartless'
export default {
  name: "showElection",
  components:{
    Chart
  },
  data() {
    return {
      title: "Consulter les statistiques des élections",
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
      def : {
        type : 'bar'
      },
      data : [
            { label: 'London', value:'330' },
            { label: 'Barcelona', value:'430' },
            { label: 'Paris', value:'150' },
            { label: 'Belgrade', value:'220' }
        ]
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
      const res = ShowStatistique.data.stats
      console.log(res)
      const stat=[]
      res.forEach(element => {
        const row = {label:element.nomc, value:element.compteur}
        stat.push(row)
      });
      this.stat = stat
      if(this.stat.length >0){
        this.hasElec = true
      }
      
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
  margin-bottom:5%;
}
.id{
    background-color: #af9b6f;
}
.chart{
  width:90%;
  
}
.graph{
  margin-top:2%;
  
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
  width: 80%;
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

@media (max-width: 1250px) {
    
  .chart {
    margin-top:5%;
    margin-bottom:5%;
    width:100%;
  }

}
</style>