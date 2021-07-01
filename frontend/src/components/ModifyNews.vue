<template>
  <div class="News">
    <h1>{{ title }}</h1>
    <div class ="affichageNews">
        <button type="submit" @click="displayNews()" id="newsShow">Afficher news</button>      
        <div  v-for="newi in news" v-bind:key="newi.idinfopol" id="newsDisplay">
        <input type="radio" v-model="currentNews" :id="newi.id" :value="newi.idinfopol" checked>
        <label :for="newi.id">
          Titre : {{newi.titreinf}}
          Description : {{newi.descriptionsinf}}
          <img :src="newi.image" width="400" height="200"/>
          
        </label>
      </div>
      <div id=nemod>
        <form @submit.prevent="modNews()" method="POST">
          <div id="formModifNews">
            <input type="text" id="formInput" v-model="ne.titreinfo" placeholder="Entrer le nouveau titre" required>
            <input type="text" id="formInput" v-model="ne.descriptionsinfo" placeholder="Entrer une nouvelle description" required>
            <input type="url" id="formInput" v-model="ne.imageo" placeholder="Mettre une nouvelle URL" required>
          </div>  
            <button type="submit" id= "buttonMod" @click="modNews()">Modifier cette  News</button>              
        </form>
        <button @click="deleteNews()" id="buttonSupp">Supprimer cette News</button>
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
  name: "ModifyNews",
  data() {
    return {
      title: "Modifier une news",
      ne:{
        idinfopol:'',
        titreinfo:'',
        descriptionsinfo: '',
        imageo: '',
      },
      news : [],
      currentNews : '',
      response:''
    };
  },
  methods:{
    async displayNews() {
        this.response=''
        const affNews= await axios.post ('/api/affNews',{
        });
        this.news = affNews.data
      }, 
    //modif votant
      async modNews(){
        this.ne.idinfopol = this.currentNews
        const modNews= await axios.post('/api/modNews', {
          newi:this.ne
        });
        this.response = modNews.data.mess
      },
      //supprimer Votants
      async deleteNews(){
        console.log(this.currentNews)
        const supNews= await axios.post('/api/supNews', {
          idinfopol : this.currentNews,
        });
        this.response = supNews.data.mess
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

.affichageNews{
  margin-top:3%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid #245fb8;
  background-color: rgb(243, 243, 243);
  padding-bottom: 2%;
  padding-top: 2%;
  width: 50%;
  border-radius: 20px;
  margin: auto;
  padding: auto;
}

#formModifNews{
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  margin-bottom: 5%;
  text-align: center;

}

#formInput{
  border-radius:5px;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 120%;
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
  background-color: rgb(233, 32, 32);

}

#newsDisplay{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#newsShow {
  margin-bottom: 5%;
}

img{
  margin: 2%;
  border: solid;
}

/**Gestion des "petits" écrans */
@media (max-width: 1250px) {
  .affichageNews{
    width: 90%
  } 
}
</style>