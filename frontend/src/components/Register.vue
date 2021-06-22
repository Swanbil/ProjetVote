<template>
  <div class="login-form">
    
        <h2 class="text-center">Inscription</h2>       
        <div class="form-group">
            <input type="text" v-model="newUser.numElec" class="form-control" placeholder="Numero electeur" required="required">
        </div>
        <div class="form-group">
            <input type="text" v-model="newUser.lastName" class="form-control" placeholder="Nom" required="required">
        </div>
        <div class="form-group">
            <input type="text" v-model="newUser.name" class="form-control" placeholder="Prenom" required="required">
        </div>
        <div class="form-group">
            <input type="text" v-model="newUser.email" class="form-control" placeholder="email" required="required">
        </div>
        
        <div class="form-group">
            <input type="password" v-model="newUser.password" class="form-control" placeholder="Mot de passe" required="required">
        </div>
        <div class="form-group">
            <button type="submit" @click="registerUser()" class="btn btn-block">Inscription</button>
        </div>
        
        <div class="response">
            {{response}}
        </div>
               
    
    
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data(){
    return{
      title:'Inscription',
      newUser:{
          numElec:'',
          lastName:'',
          name:'',
          email:'',
          password:''

      },
      response:''
    }
    
  },
  methods:{
    async registerUser(){
        console.log(this.newUser);
        const response = await axios.post('/api/register',this.newUser)
        this.response = response.data
    }
  },
  
}
</script>


<style scoped>
.login-form {
    width: 30%;
    margin: 50px auto;
    font-size: 15px;	
}
.login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    border-radius:5px;
    padding: 40px;
    
}
.login-form h2 {
    margin: 0 0 15px;
    font-weight: bold;
    margin-bottom:40px;
}
.form-control, .btn {
    min-height: 38px;
    border-radius: 2px;
    margin-bottom:20px;
    
}
.btn {        
    font-size: 15px;
    font-weight: bold;
    width:100%;
    background-color:#8ac57b;
    color:rgb(255, 255, 255);
}
.clearfix{
    text-decoration:none;
}
.response{
    text-align: center;
    background-color:rgb(196, 105, 105);
    font-weight:bold;
}

@media (max-width: 1250px) {
    .login-form {
    width: 80%; 	
    }
}

</style>