<template>
  <div class="candidat">
    <h1>{{ title }}</h1>
    <div id="modifCandidat">
      <form @submit.prevent="displayElec()" method="POST">
        <div id="selectCat">
          <label for="statut-select" class="modifelec">
              Choisisser la catégorie d'élection à laquelle le candidat a participé :
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
    
    <div  v-for="election in elections" v-bind:key="election.idelection" id="elecResult">
      <input type="radio" v-model="currentElection" :id="election.id" :value="election.idelection" checked>
        <label :for="election.id">
          Date de début : {{election.datedebut}}<br/>
          Date de fin : {{election.datefin}}<br/>
          {{election.description}}
        </label>
    </div>

    <div classe ="affichageCanddiat">
      <button type="submit" id="buttonAffCand" @click="buttonAffCand()">Afficher les candidats</button>
      <div  v-for="candidat in candidats" v-bind:key="candidat.idcandidat" id="cand">
        
        <input type="radio" v-model="currentCandidat" :id="candidat.id" :value="candidat.idcandidat" checked>
        <label :for="candidat.id">
          Nom : {{candidat.nomc}},
          Prenom : {{candidat.prenomc}},
          <!-- Email : {{candidat.emailc}}, -->
          Parti politique : {{candidat.partipolitique}},
          Descriptif du projet : {{candidat.descriptifprojet}}
        </label>
      </div>
            
    </div>
      
      <div id=camod>
        <form @submit.prevent="modCandidat()" method="POST">
          <div id="modifFormCandidat">
          <input type="text" v-model="ca.nomc" placeholder="Entrer son nom" required>
          <input type="text" v-model="ca.prenomc" placeholder="Entrer son prenom" required>
          <input type="text" v-model="ca.emailc" placeholder="Entrer son mail" required>
          <input type="text" v-model="ca.partipolitique" placeholder="Entrer son partie" required>
          <input type="text" v-model="ca.descriptifprojet" placeholder="Entrer son projet" required>
          </div>
          <button type="submit" id="boutonModif" @click="modCandidat()">Modifier ce candidat</button>   
        </form>
        <button @click="deleteCandidat()" id="boutonSup">Supprimer ce candidat</button>
      </div>
    
  </div> 
  <div class="response" >
    <b-modal id="modal-1" title="Notification" centered>
      <p class="my-4">{{response}}</p>
    </b-modal>
  </div> 
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModifyCandidat",
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
    //aff elections
      async displayElec() {
      this.response=''
      const affElec= await axios.post ('/api/affElec',{
      categorie: this.el.categorie,
      });
      this.elections = affElec.data
    },
        
   //modif candidat
    async modCandidat(){
      this.ca.idcandidat = this.currentCandidat
      console.log(this.ca)
      const modCandidat= await axios.post('/api/modCandidat', {
        candidat:this.ca,
      });
      this.response = modCandidat.data.mess;
      this.$bvModal.show('modal-1')
    },
    //supprimer candidat
    async deleteCandidat(){
      console.log(this.currentCandidat)
      const supCandidat= await axios.post('/api/supCandidat', {
        idcandidat : this.currentCandidat,
        idelection : this.currentElection,
      });
      this.response = supCandidat.data.mess
      this.$bvModal.show('modal-1')
    },
    //affichage candidats 
    async buttonAffCand(){
      this.el.idelection = this.currentElection,
      this.response=''
      const affCand= await axios.post ('/api/affCandidat',{
        categorie: this.el.categorie,
        idelection : this.currentElection,
      });
      this.candidats = affCand.data
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
}
.response {
  margin-top:5%;
  margin-right:30%;
  margin-left:30%;
  text-align: center;
  font-weight: bold;
  margin-bottom:5%;
}

input{
  padding:3%;
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
#buttonAffCand{
  background-color: rgb(148, 137, 137);
  margin-top: 5%;
}

/**Gestion des "petits" écrans */
@media (max-width: 1250px) {
  #modifCandidat{
    width:75%
  }  
}
</style>