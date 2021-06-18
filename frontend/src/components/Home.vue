<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <p>Here, you can see all the news</p>
    <div class="btn">
      <b-button @click="getAllUsers" size="sm" class="btn my-2 my-sm-0 mx-2" type="submit" variant="dark">Test</b-button>
    </div>
    
    
    {{msg}}
    
    
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      title:'Home',
      msg:'',
      
    }
    
  },
  methods:{
    async getAllUsers() {
      let res = await fetch('/api/users')
      var data = await res.json();
      console.log(data)
      this.msg = data.mess
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  text-align: center;
}
h1{
  text-align:center;
  margin-top:50px;
  font-weight: bold;
  margin-bottom:5%;
  
}
.btn{
  text-align: center;
  padding:5px;
  width:40%;
}
</style>
