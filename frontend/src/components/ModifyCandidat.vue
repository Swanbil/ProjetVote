<template>
  <div class="candidat">
    <h1>{{ title }}</h1>
    <div id="modifCandidat">
    <form @submit.prevent="displayCandidat()" method="POST">
      <div id="selectCat">
        <label for="statut-select" class="modifelec">
            Choisisser l'élection à laquelle le candidat a participé :
        </label>
        <select id="statut-select" v-model="el.categorie" class="modifelec">
          <option value="" disabled selected class="modifelec">Catégorie</option>
          <option value="presidentielle">Présidentielle</option>
          <option value="municipale">Municipale</option>
          <option value="regionale">Régionale</option>
        </select>
        <button id="boutonValid">Valider</button>
        </div>       
    </form>

    <div classe ="affichageCanddiat">
      </div>
      <div  v-for="candidat in candidats" v-bind:key="candidat.idcandidat" id="cand">
        <input type="radio" v-model="currentCandidat" :id="candidat.id" :value="candidat.idcandidat"
         checked>
        <label :for="candidat.id">
          Nom : {{candidat.nomc}},
          Prenom : {{candidat.prenomc}},
          <!-- Email : {{candidat.emailc}}, -->
          Parti politique{{candidat.partipolitique}},
          Descriptif du projet : {{candidat.descriptifprojet}}

        </label>

      </div>
      <div id=camod>
        <form @submit.prevent="modCandidat()" method="POST">
          <div id="modifFormCandidat">
          <input type="text" v-model="ca.nomco" placeholder="Entrer son nom" required>
          <input type="text" v-model="ca.prenomco" placeholder="Entrer son prenom" required>
          <input type="text" v-model="ca.emailco" placeholder="Entrer son mail" required>
          <input type="text" v-model="ca.partipolitiqueco" placeholder="Entrer son partie" required>
          <input type="text" v-model="ca.descriptifprojetco" placeholder="Entrer son projet" required>
          </div>
          <button type="submit" id="boutonModif" @click="modCandidat()">Modifier ce candidat</button>
          
        </form>
        <button @click="deleteCandidat()" id="boutonSup">Supprimer ce candidat</button>
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

#modifCandidat{
  margin-top:3%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid #245fb8;
  background-color: rgb(243, 243, 243);
  padding-top: 5%;
  padding-bottom: 5%;
  width: 85%;
  border-radius: 20px;
  margin: auto;
  padding: auto;
}

#selectCat{
  display: flex;
  flex-direction: column;
}

button{
  margin: auto;
  padding: 2%;
  border-radius: 7px;
  justify-content: center;
  margin-top: 2%;
  color: cornsilk;
  font-weight: bold;
}

#boutonValid{
  background-color: rgb(12, 197, 95);;
  margin-bottom: 5%;
  margin-top: 3%
}

#boutonModif{
  background-color: cornflowerblue;
  margin-bottom: 5%;

}

#boutonSup{
  background-color: rgb(230, 76, 76);
  margin-top: 5%;

}

#modifFormCandidat{
  display: flex;
  flex-direction: column;
  margin-bottom: 8%;
}

input{
  margin-bottom: 5%;
  margin-top: 5%;
  border-radius: 5px;
}
#cand{
  font-weight: bold;
}

/**Gestion des "petits" écrans */
@media (max-width: 1250px) {
  #modifCandidat{
    width:75%
  }  
}
</style>