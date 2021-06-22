<template>
  <div class="news">
      <b-card no-body class="im overflow-hidden" style="max-width: 100%">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img
              src="https://generationecologie.fr/wp-content/uploads/2021/06/Affiche-regionale-ile-de-France-e1623080546871-721x1024.png"
              alt="Image"
              class="rounded-0"
              
            ></b-card-img>
          </b-col>
          <b-col class="cardText" md="8">
            
            <b-card-body title="Titre/Candidat">
              <b-card-text>
                This card allows to describe the program of a candidat for an election.
                Nom
                Prenom
                email
                Partie politique
                Description programme
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>

  </div>
</template>

<script>
export default {
  name: 'New',
  data(){
    return{
      title:'New'
    }
    
  },
}
</script>


<style scoped>
h1{
  text-align:center;
  margin-top:50px;
  font-weight: bold;
  margin-bottom:5%;
  
  
}
.news{
    text-align: center;
    
}
.cardText{
    background-color: rgb(253, 252, 252);
}
@media (max-width: 1250px) {   
  .im {
    width: 80%;  
  }
}
</style>