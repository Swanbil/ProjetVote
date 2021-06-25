<template>
  <div class="Votant">
    <h1>{{ title }}</h1>
    <div id="ajoutVotant">
     <form @submit.prevent="addVotant()" method="POST">

        <input type="text" v-model="votant.nomv" placeholder="Entrez le nom du votant" required/>
        <input type="text" v-model="votant.prenomv" placeholder="Entrez le prenom du votant" required/>
        <input type="email" v-model="votant.emailv" placeholder="Entrez l'email du votant" required/>
        <input type="text" v-model="votant.numelec" placeholder="Entrez le numero electeur du votant" required/>
        <input type="text" v-model="votant.password" placeholder="Entrez le mdp du votant" required/>

        <button type="submit">Valider</button>
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
  name: 'AddVotant',
  data(){
    return{
      title:'Ajouter un votant',
      votant:{
        nomv:'',
        prenomv: '',
        emailv: '',
        numelec: '',
        password : '',
      },
      response:''
      
    }
    
  },
  methods:{
      async addVotant(){
      const response = await axios.post('/api/addVotant', {
        votant:this.votant
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
}
</style>