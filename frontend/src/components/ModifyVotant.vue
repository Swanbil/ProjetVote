<template>
  <div class="Votant">
    <h1>{{ title }}</h1>
    <div class ="affichageVotant">
        <button type="submit" @click="displayVotant()">aficher  votant</button>      
        <div  v-for="votant in votants" v-bind:key="votant.idutilisateur">
        <input type="radio" v-model="currentVotant" :id="votant.id" :value="votant.idutilisateur" checked>
        <label :for="votant.id">
          {{votant.idutilisateur}}
          {{votant.nomv}}
          {{votant.prenomv}}
          {{votant.emailv}}
          {{votant.numelec}}
          {{votant.password}}
          {{votant.dejavote}}
        </label>

      </div>
      <div id=vomod>
        <form @submit.prevent="modVotant()" method="POST">
            <input type="text" v-model="vo.nomvo" placeholder="Entrez le nom du votant" required>
            <input type="text" v-model="vo.prenomvo" placeholder="Entrez le prenom du votant" required>
            <input type="email" v-model="vo.emailvo" placeholder="Entrez l'email du votant" required>
            <input type="text" v-model="vo.numeleco" placeholder="Entrez le numero electeur du votant" required>
            <input type="text" v-model="vo.passwordo" placeholder="Entrez le mdp du votant" required>
            <button @click="modVotant()">Modifier ce votant</button>
            <button @click="deleteVotant()">Supprimer cette election</button>
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
  name: "ModifyVotant",
  data() {
    return {
      title: "Modifier un votant",
      vo:{
        idutilisateur:'',
        nomvo:'',
        prenomvo: '',
        emailvo: '',
        numeleco: '',
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
      },
      //supprimer Votants
      async deleteVotant(){
        console.log(this.currentvotant)
        const supVotant= await axios.post('/api/supVotant', {
          idutilisateur : this.currentVotant,
        });
        this.response = supVotant.data.mess
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