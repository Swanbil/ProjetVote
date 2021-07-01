<template>
  <div class="home">
    
    
    <h1>{{ title }}</h1>
    <p>Here, you can see all the news</p>
    
    <div class="news">
      <div class="tabElec">
        <Table></Table>
      </div>
      <div class="liNews" v-for="newi in news" :key="newi.idinfopol">
        <New :candidat="newi.titreinf" :description="newi.descriptionsinf" :image="newi.image" :partiPol="newi.titreinf" width="100%"></New>
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
    console.log("info",this.news)

  }
};
</script>


<style scoped>
.home {
  text-align: center;
}

h1 {
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 5%;
}
.btn {
  text-align: center;
  padding: 5px;
  width: 40%;
}
.news {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin:3%;
}
  .tabElec{
    margin-left:3%;
    margin-right:3%;
  }
@media (max-width: 1250px) {
    
  .news {
    align-items: center;
  }

}
</style>
