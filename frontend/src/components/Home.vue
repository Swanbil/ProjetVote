<template>
  <div class="home">
    
    
    <h1>{{ title }}</h1>
    
    
    <div class="news">
      <div class="tabElec">
        <h2>Prochaines elections</h2>
        <Table></Table>
      </div>
      <h2>Informations politiques</h2>
      <div class="liNews">
        <New :candidat="cand" :description="desc" :image="im" width="100%"></New>
        <New :candidat="cand" :description="desc" :image="im" width="100%"></New>
        <New :candidat="cand" :description="desc" :image="im" width="100%"></New>
      </div>
    </div>
  </div>
</template>

<script>
import New from "./News.vue";
import Table from "./Table.vue";
export default {
  name: "Home",
  components: {
    New,
    Table
  },
  data() {
    return {
      title: "Home",
      msg: "",
      cand:'Julien Bayou',
      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
      im:'https://generationecologie.fr/wp-content/uploads/2021/06/Affiche-regionale-ile-de-France-e1623080546871-721x1024.png'
    };
  },
  methods: {},
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
h2{
  margin-top:50px;
  margin-bottom:50px;
  color:cornflowerblue

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
