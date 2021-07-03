<template>
  <div class="table">
    <b-table striped hover :items="elections" outlined></b-table>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: "Table",
  data(){
      return{
          elections:[]
      }
  },
  async beforeMount(){
      const response = await axios.get('/api/elections')
      const elec = response.data.elections
      const elections = []
      elec.forEach(el => {
          const row = {Election:el.electype,Date_debut:el.datedebut,Date_Fin:el.datefin,Description:el.description}
          elections.push(row)
      });
      this.elections = elections
  }
};
</script>

<style scoped>
.table{
    text-align: center;
    
}
</style>