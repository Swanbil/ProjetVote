<template>
  <div class="News">
    <h1>{{ title }}</h1>
    <div class ="affichageNews">
        <button type="submit" @click="displayNews()">aficher  news</button>      
        <div  v-for="newi in news" v-bind:key="newi.idinfopol">
        <input type="radio" v-model="currentNews" :id="newi.id" :value="newi.idinfopol" checked>
        <label :for="newi.id">
          {{newi.idinfopol}}
          {{newi.titreinf}}
          {{newi.descriptionsinf}}
          <img :src="newi.image"/>
          
        </label>
      </div>
      <div id=nemod>
        <form @submit.prevent="modNews()" method="POST">
            <input type="text" v-model="ne.titreinfo" placeholder="Entrez le nouveau titre" required>
            <input type="text" v-model="ne.descriptionsinfo" placeholder="Entrez une nouvelle description" required>
            <input type="url" v-model="ne.imageo" placeholder="mettez une nouvelle image en url" required>
            <button type="submit" @click="modNews()">Modifier cette  News</button>            
        </form>
        <button @click="deleteNews()">Supprimer cette News</button>
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
</style>