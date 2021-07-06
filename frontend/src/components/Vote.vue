<template>
  <div class="vote">
    <h1>{{ title }}</h1>
    <p v-if="isLog && !isAdmin">Vous pouvez voter pour les elections suivantes</p>
    <p v-else>Connectez vous à votre compte si vous voulez voter</p>
    <div>
      <div v-show="showElection" v-if="isLog && !isAdmin" class="elections">
        <div
          v-for="election in elections"
          :key="election.idelection"
          class="liste-election"
        >
          <input
            type="radio"
            v-model="currentElection"
            :id="election.id"
            :value="election.idelection"
            checked
          />
          <New
            class="news"
            :candidat="election.electype"
            :description="election.description"
            :dateDeb="election.datedebut"
            :dateFin="election.datefin"
            :partiPol="election.electype"
            width="50%"
          ></New>
        </div>
        <button class="btn" @click="getCandidats()">Valider</button>
      </div>

      <div v-show="!showElection && candidats.length!=0" class="candidats">
        <div v-for="candidat in candidats" :key="candidat.idcandidat">
          <input
            type="radio"
            v-model="currentCandidat"
            :id="candidat.nomc"
            :value="candidat.idcandidat"
            checked
          />
          <New
            class="news"
            :candidat="candidat.nomc + ' ' + candidat.prenomc"
            :description="candidat.descriptifprojet"
            :partiPol="candidat.partipolitique"
            width="50%"
          ></New>
        </div>
        <button class="btn" @click="vote()">Voter</button>
      </div>
    </div>

    <div class="response" >
      <b-modal id="modal-1" title="Notification" @ok="goHome()" centered>
        <p class="my-4">{{response}}</p>
      </b-modal>
    </div> 
  </div>
</template>

<script>
import axios from "axios";
import New from "./News.vue";
export default {
  name: "Vote",
  components: {
    New,
  },
  data() {
    return {
      title: "Vote",
      elections: [],
      currentElection: "",
      currentCandidat: "",
      candidats: [],
      showElection: true,
      response: '',
    };
  },
  props: {
    isLog: Boolean,
    isAdmin: Boolean,
  },
  methods: {
    async getCandidats() {
      this.response = ''
      try {
        const response = await axios.post("/api/candidats", {
        idElection: this.currentElection,
      });
      this.candidats = response.data.candidats;
      this.showElection = false;
      } catch (error) {
        this.response = error.response.data.message;
        this.$bvModal.show('modal-1')
      }
    },

    async vote() {
      this.response = ''
      const response = await axios.post("/api/vote", {
        idElection: this.currentElection,
        idCandidat: this.currentCandidat,
      });
      this.response = response.data.message;
      this.$bvModal.show('modal-1')
      
      
    },
    goHome(){
      this.$router.push({name:'Home'})
    }
  },

  async mounted() {
    const response = await axios.get("/api/elections");
    this.elections = response.data.elections;
  },
};
</script>


<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 5%;
}
.vote {
  text-align: center;
}
.candidats {
  flex-direction: column;
}
.news {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
  justify-content: center;
  width: 20%;
  margin-top: 2%;
  background-color: cornflowerblue;
  color: cornsilk;
  font-weight: bold;
}
.response {
  margin-top:5%;
  margin-bottom:5%;
  text-align: center;
  font-weight: bold;
}
</style>