<template>
  <div class="vote">
    <h1>{{ title }}</h1>
    <p v-if="isLog && !isAdmin">Here, you can vote</p>
    <p v-else>Connect to your vote account if you want to vote</p>

    <div v-show="showElection" v-if="isLog && !isAdmin" class="elections">
      <div  v-for="election in elections" :key="election.idelection" class="liste-election">
        <input type="radio" v-model="currentElection" :id="election.id" :value="election.idelection"
         checked>
        <label :for="election.id">
          {{election.electype}}
          {{election.datedebut}}
          {{election.datefin}}
          {{election.description}}
        </label>
      </div>
      <button @click="getCandidats()">Valider</button>
    </div>

      <div v-show="!showElection" class="candidats">
        <div v-for="candidat in candidats" :key="candidat.nomc">
          <input type="radio" v-model="currentCandidat" :id="candidat.nomc" :value="candidat.nomc"
          checked>
          <New :candidat="candidat.nomc+' '+candidat.prenomc" :description="candidat.descriptifprojet+' '+candidat.partipolitique"></New>
        </div>
        <button @click="vote()">Valider</button>
      </div>

    </div>
</template>

<script>
import axios from 'axios';
import New from "./News.vue";
export default {
  name: 'Vote',
  components:{
    New
  },
  data(){
    return{
      title:'Vote',
      elections:[],
      currentElection:'',
      currentCandidat:'',
      candidats:[],
      showElection:true
    }
    
  },
  props: {
    isLog: Boolean,
    isAdmin: Boolean
  },
  methods:{
    async getCandidats(){
      const response = await axios.post('/api/candidats', {idElection:this.currentElection})
      this.candidats = response.data.candidats
      this.showElection = false
    },
    async vote(){
      const choice = this.currentCandidat
      console.log("choice = ",choice)
    }
  },
  async mounted(){
    const response = await axios.get('/api/elections')
    this.elections = response.data.elections
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
.vote{
  text-align: center;
}
</style>