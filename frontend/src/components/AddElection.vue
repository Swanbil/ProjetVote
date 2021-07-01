<template>
  <div class="elections">
    <h1>{{ title }}</h1>
    <div id="ajoutElections">
     <form @submit.prevent="addElec()" method="POST">
          <label for="statut-select" class="elec">
            Choisir votre catégorie d'élections :
          </label>

          <select id="statut-select" v-model="election.categorie" class="elec">
            <option value="" disabled selected class="elec">Catégorie</option>
            <option value="presidentielle">Présidentielle</option>
            <option value="municipale">Municipale</option>
            <option value="regionale">Régionale</option>
          </select>
          <div id="dDate">
          <p id=datD>Sélectionner la date de début :</p>
          <input type="date" v-model="election.date" placeholder="Date de début" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required />
          </div>

          <div id="fDate">
          <p id=datF>Sélectionner la date de fin :</p>
          <input type="date" v-model="election.dateF" placeholder="Date de fin" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required/>
          </div>

          <div id="description">
          <input type="text" v-model="election.descri" placeholder="Entrer une descrption"  required/>
          <button type="submit">Valider</button>
          </div>
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
      title:'Ajouter une élection',
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
  margin-bottom:5%;
}
#statut-select{
  margin-left: 2.5%;
  margin-top: 2.5%
}

#ajoutElections{
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

#dDate{
  display: flex;
  margin-top: 8%;
  margin-bottom: 8%;
}

#fDate{
  display: flex;
  margin-top: 8%;
  margin-bottom: 8%;
}

input {
  border-radius: 5px;
  margin-left: 2.5%;
}

#description{
  display: flex;
  flex-direction: column;
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

#elections{
  display: flex;
}

/**Gestion des "petits" écrans */
@media (max-width: 1250px) {
    
  #ajoutElections {
    width: 60%;
  }
}

</style>