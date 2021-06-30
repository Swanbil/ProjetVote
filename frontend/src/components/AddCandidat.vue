<template>
  <div class="Candidat">
    <h1>{{ title }}</h1>
    <div id="addCandidat">
      <div id="modifElections">
    <form @submit.prevent="displayElec()" method="POST">
      <div id="test2">
        <label for="statut-select" class="modifelec">
            Choisir la catégorie d'élections à laquelle participe le candidat :
        </label>
        <select id="statut-select" v-model="el.categorie" class="modifelec">
          <option value="" disabled selected class="modifelec">Catégorie</option>
          <option value="presidentielle">Présidentielle</option>
          <option value="municipale">Municipale</option>
          <option value="regionale">Régionale</option>
        </select>
        <button id="buttonElec">Valider</button>  
      </div>     
    </form>

    <div class ="affichageElec">
      <div  v-for="election in elections" v-bind:key="election.idelection">
        <input type="radio" v-model="currentElection" :id="election.id" :value="election.idelection"
         checked>
        <label :for="election.id">
          Date de début : {{election.datedebut}}
          Date de fin : {{election.datefin}}
          {{election.description}}
        </label>
      </div>
    </div>  
    <div id="ajoutCandidat">
     <form @submit.prevent="addCandidat()" method="POST">
       <div id="test">
        <input type="text" id="inputForm" v-model="candidat.nomc" placeholder="Entrer le nom du candidat" required/>
        <input type="text" id="inputForm" v-model="candidat.prenomc" placeholder="Entrer le prenom du candidat" required/>
        <input type="email" id="inputForm" v-model="candidat.emailc" placeholder="Entrer l'email du candidat" required/>
        <input type="text" id="inputForm" v-model="candidat.partipolitique" placeholder="Indiquer son partie politique" required/>
        <input type="text" id="inputForm" v-model="candidat.descriptifprojet" placeholder="Un bref descriptif du projet" required/>
        <button type="submit" id="inputFormButton">Valider</button>
        </div>
      </form>
  </div>
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
      title:'Ajouter un candidat',

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

#test{
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: auto;
}

button{
  margin: auto;
  padding: 2%;
  border-radius: 7px;
  justify-content: center;
  width: 20%;
  margin-top: 2%;
  background-color: cornflowerblue;
  color: cornsilk;
  font-weight: bold;
}

#modifElections{
  display: flex;
  flex-direction: column;
}

#test2{
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: auto;
}

.affichageElec{
  margin-bottom: 2%;
  margin-top: 2%;
}

#inputForm{
  margin-bottom: 2%;
  margin-top: 2%;
  border-radius: 5px;

}

#inputFormButton {
  margin-bottom: 2%;
  margin-top: 10%;
  border-radius: 5px;
}


#addCandidat{
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

/**Gestion des "petits" écrans */
@media (max-width: 1250px) {
    #addCandidat{
      width: 100%;
    }
  
}

</style>