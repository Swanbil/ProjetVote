<template>
  <div class="News">
    <h1>{{ title }}</h1>
    <div id="ajoutNews">
     <form @submit.prevent="addNews()" method="POST">

        <input type="text" v-model="informationpolitiques.titreinf" placeholder="Entrez le titre" required/>
        <input type="text" v-model="informationpolitiques.descriptionsinf" placeholder="Entrez une description" required/>
        <input type="url" v-model="informationpolitiques.image" placeholder="mettez une url d'une image" required/>

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
}
</style>