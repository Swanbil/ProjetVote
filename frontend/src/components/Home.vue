<template>
  <div class="home">

    <h1>{{ title }}</h1>
    <p>Bienvenue sur E-vote, ici consultez les dernières news et les élections en cours </p>
    
    <div class="news">
      <div class="tabElec">
        <h2>Prochaines elections</h2>
        <Table></Table>
      </div>
      <h2>Informations politiques</h2>
      <div class="liNews" v-for="newi in news" :key="newi.idinfopol">
        <New :candidat="newi.titreinf" :description="newi.descriptionsinf" :image="newi.image" width="100%" height="600" :partiPol="newi.titreinf" ></New>
      </div>

    </div>
  </div>
  
</template>

<script>
import New from "./News.vue";
import Table from "./Table.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    New,
    Table
  },
  data() {
    return {
      title: "Home",
      news:[]
    };
  },
  async mounted(){
    this.response=''
    const affNews= await axios.get('/api/infopol',{});
    this.news = affNews.data

  }
};
</script>


<style scoped>
.home {
  text-align: center;;
}

h1 {
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 5%;
}

h2{
  margin-top:2%;
  margin-bottom:3%;
  color:#4b6ea1; 
}


.btn {
  text-align: center;
  padding: 5px;
  width: 40%;
}
.news {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin:3%;
}
.tabElec{
  margin-left:3%;
  margin-right:3%;
  margin-bottom:5%;
  }
@media (max-width: 1250px) {
    
  .news {
    align-items: center;
  }

}
</style>
