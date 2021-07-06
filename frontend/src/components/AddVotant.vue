<template>
  <div class="Votant">
    <h1>{{ title }}</h1>
    <div id="ajoutVotant">
     <form @submit.prevent="addVotant()" method="POST">
       <div id="formAddVotant">
        <input type="text" v-model="user.name" placeholder="Entrez le nom du votant" required/>
        <input type="text" v-model="user.lastName" placeholder="Entrez le prenom du votant" required/>
        <input type="email" v-model="user.email" placeholder="Entrez l'email du votant" required/>
        <input type="text" v-model="user.numElec" placeholder="Entrez le numero electeur du votant" required/>
        <input type="password" v-model="user.password" placeholder="Entrez le mdp du votant" required/>
        </div>
        <button type="submit">Valider</button>
      </form>
  </div>

  <div class="response" >
    <b-modal id="modal-1" title="Notification" centered>
      <p class="my-4">{{response}}</p>
    </b-modal>
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
      user:{
        numElec: "",
        lastName: "",
        name: "",
        email: "",
        password: ""  
      },
      response:''
      
    }
    
  },
  methods:{
      async addVotant(){
      const response = await axios.post('/api/register', 
        this.user
      );
      this.response = response.data.message
      this.$bvModal.show('modal-1')
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
  font-weight: bold;
  margin-bottom:5%;
}

#ajoutVotant{
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

#formAddVotant{
  display: flex;
  flex-direction: column;
}

input{
  margin-top: 5%;
  border-radius: 5px;

}

button{
  margin: auto;
  padding: 2%;
  border-radius: 7px;
  justify-content: center;
  width: 80%;
  margin-top: 10%;
  background-color: cornflowerblue;
  color: cornsilk;
  font-weight: bold;
}
</style>