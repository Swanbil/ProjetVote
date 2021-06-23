<template>
  <div class="vote">
    <h1>{{ title }}</h1>
    <p v-if="isLog && isAdmin">Here, you can vote</p>
    <p v-else>Connect to your vote account if you want to vote</p>

    
  </div>
</template>

<script>
export default {
  name: 'Vote',
  data(){
    return{
      title:'Vote'
    }
    
  },
  props: {
    isLog: Boolean,
    isAdmin: Boolean
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