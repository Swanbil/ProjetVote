<template>
  <div class="manage">
    <h1>{{ title }}</h1>
    <p>Here, you can manage users</p>
    
  </div>
</template>

<script>
export default {
  name: 'ManageUsers',
  data(){
    return{
      title:'Manage Users'
    }
    
  },
  props: {
    msg: String
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
.manage{
  text-align: center;
}
</style>