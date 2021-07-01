<template>
  <div class="News">
    <h1>{{ title }}</h1>
    <div id="ajoutNews">
     <form @submit.prevent="addNews()" method="POST">
      <div id="formAddNews">
        <input type="text" v-model="informationpolitiques.titreinf" placeholder="Entrer le titre" required/>
        <input type="text" v-model="informationpolitiques.descriptionsinf" placeholder="Entrer une description" required/>
        <input type="url" v-model="informationpolitiques.image" placeholder="Mettre l'URL d'une image" required/>
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
  name: 'AddNews',
  data(){
    return{
      title:'Ajouter une News',
      informationpolitiques:{
        titreinf:'',
        descriptionsinf: '',
        image: '',
      },
      response:''
      
    }
    
  },
  methods:{
      async addNews(){
      const response = await axios.post('/api/addNews', {
        informationpolitiques:this.informationpolitiques
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

#ajoutNews{
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

input{
  border-radius: 5px;
  margin-bottom: 5%;
  margin-top: 5%;
}

#formAddNews{
  display: flex;
  flex-direction: column;
}

button{
  margin: auto;
  padding: 2%;
  border-radius: 7px;
  justify-content: center;
  margin-top: 2%;
  background-color: cornflowerblue;
  color: cornsilk;
  font-weight: bold;
}
</style>