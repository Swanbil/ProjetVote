<template>
  <div class="home">
    
    
    <h1>{{ title }}</h1>
    <p>Here, you can see all the news</p>

    <div class="news">
      <New :candidat="cand" :description="desc" :image="im" width="100%"></New>
      <New :candidat="cand" :description="desc" :image="im" width="100%"></New>
      <New :candidat="cand" :description="desc" :image="im" width="100%"></New>
    </div>
  </div>
</template>

<script>
import New from "./News.vue";
export default {
  name: "Home",
  components: {
    New,
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
@media (max-width: 1250px) {
    
  .news {
    align-items: center;
  }
}
</style>
