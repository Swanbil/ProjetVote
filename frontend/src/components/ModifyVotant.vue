<template>
  <div class="Votant">
    <h1>{{ title }}</h1>
    <div class ="affichageVotant">
        <button type="submit" @click="displayVotant()">Afficher  votant</button>      
        <div  v-for="votant in votants" v-bind:key="votant.idutilisateur" id="vot">
        <input type="radio" v-model="currentVotant" :id="votant.id" :value="votant.idutilisateur" checked>
        <label :for="votant.id">
          Nom : {{votant.nomv}}
          Prénom : {{votant.prenomv}}
          e-mail : {{votant.emailv}}
          N° électeur : {{votant.numelec}}
        </label>
      </div>
      <div id=vomod>
        <form @submit.prevent="modVotant()" method="POST">
          <div id="formModifVotant">
            <input type="text" v-model="vo.nomvo" placeholder="Entrer le nom du votant" required>
            <input type="text" v-model="vo.prenomvo" placeholder="Entrer le prenom du votant" required>
            <input type="email" v-model="vo.emailvo" placeholder="Entrer l'email du votant" required>
            <input type="password" v-model="vo.passwordo" placeholder="Entrer le mdp du votant" required>
            </div>
            <input type="submit" id= "buttonMod" value="Modifier ce votant">
        </form>
      <button @click="deleteVotant()" id="buttonSupp">Supprimer ce votant</button>

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
  name: "ModifyVotant",
  data() {
    return {
      title: "Modifier un votant",
      vo:{
        idutilisateur:'',
        nomvo:'',
        prenomvo: '',
        emailvo: '',
        passwordo : '',
        dejavote : ''
      },
      votants : [],
      currentVotant : '',
      response:''
    };
  },
  methods:{
    async displayVotant() {
        this.response=''
        const affVotant= await axios.post ('/api/affVotant',{
        });
        this.votants = affVotant.data
      }, 
    //modif votant
      async modVotant(){
        this.vo.idutilisateur = this.currentVotant
        const modVotant= await axios.post('/api/modVotant', {
          votant:this.vo
        });
        this.response = modVotant.data.mess
        this.$bvModal.show('modal-1')
      },
      //supprimer Votants
      async deleteVotant(){
        console.log(this.currentvotant)
        const supVotant= await axios.post('/api/supVotant', {
          idutilisateur : this.currentVotant,
        });
        this.response = supVotant.data.mess
        this.$bvModal.show('modal-1')
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
  font-weight: bold;
  margin-bottom:5%;
}

.affichageVotant{
  margin-top:3%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid #245fb8;
  background-color: rgb(243, 243, 243);
  padding-top: 5%;
  padding-bottom: 5%;
  border-radius: 20px;
  margin: auto;
  padding: auto;
  width: 70%;
}

#formModifVotant{
  display: flex;
  flex-direction: column;
  margin-top: 8%;
  margin-bottom: 8%;
}

input{
  margin-top: 5%;
  margin-bottom: 5%;
  border-radius: 5px;
}

button{
  margin: auto;
  border-radius: 7px;
  justify-content: center;
  margin-top: 2%;
  color: cornsilk;
  font-weight: bold;
  background-color: gray;
}

#buttonMod{
  margin-bottom: 5%;
  margin-top: 5%;
  background-color: cornflowerblue;

}

#buttonSupp{
  margin-bottom: 5%;
  margin-top: 5%;
  background-color: rgb(230, 76, 76);

}
#vot{
  font-weight: bold;
}
/**Gestion des "petits" écrans */
@media (max-width: 1250px) {
   .affichageVotant{
     width: 90%;

   }  
}

</style>