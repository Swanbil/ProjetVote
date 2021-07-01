<template>
  <div class="election">
    <h1>{{ title }}</h1>
    <div id="modifElections">
    <form @submit.prevent="displayElec()" method="POST">
        <div id="choixCategorie">
        <label for="statut-select" class="modifelec">
            Choisisser la catégorie de l'élections à modifier :
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

    <div class ="affichageElec">
      <div  v-for="election in elections" v-bind:key="election.idelection" id="elecResult">
        <input type="radio" v-model="currentElection" :id="election.id" :value="election.idelection"
         checked>
        <label :for="election.id">

          Date de début : {{election.datedebut}}<br/>
          Date de fin : {{election.datefin}}<br/>
          {{election.description}}
        </label>
      </div>
      <div id=elmod>
        <form @submit.prevent="modElec()" method="POST">
          <div id="modifDates">
          <p id=datD>Sélectionner la date de début :</p>
          <input type="date" v-model="el.date" placeholder="Date de début" required >
          <p id=datF>Sélectionner la date de fin :</p>
          <input type="date" v-model="el.dateF" placeholder="Date de fin" required>
          </div>
          <div id="descripModif">
            <input type="text" v-model="el.descri" placeholder="Entrez une description" required>
            <button type="submit" id="boutonModif" @click="modElec()">Modifier cette élection</button>
          </div>
        </form>
        <button @click="deleteElec()" id="boutonSup">Supprimer cette élection</button>
      </div>
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
      title: "Modifier une élection",
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

#choixCategorie{
  display: flex;
  align-items: center;
  flex-direction: column;
}

#modifElections{
  margin-top:3%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid #245fb8;
  background-color: rgb(243, 243, 243);
  padding-bottom: 2%;
  padding-top: 2%;
  width: 40%;
  border-radius: 20px;
  margin: auto;
  padding: auto;
}

#modifDates{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
  margin: auto;
  padding: auto;
  margin-bottom: 5%;
  margin-top: 5%;

}

#elecResult{
  display: flex;
  width: 100%;
  margin:auto;
  padding: auto;
  justify-content: center;
  font-weight:600;
  margin-bottom: 2%;
  
}


.affichageElec{
  display: flex;
  flex-direction: column;
  width: 90%;
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

#descripModif{
  display: flex;
  flex-direction: column;
}

#boutonValid{
  background-color: rgb(12, 197, 95);
  margin-bottom: 2%;
}

#boutonModif{
  background-color: cornflowerblue;

}

#boutonSup{
  background-color: rgb(230, 76, 76);
}

input {
  border-radius: 5px;
  margin-left: 2.5%;
}

/**Gestion des "petits" écrans */
@media (max-width: 1250px) {
  #boutonSup{
    background-color: rgb(233, 32, 32);
    margin-top: 10%;
}
#boutonModif{
    background-color: cornflowerblue;
    margin-top: 10%;
}    
  
}
</style>