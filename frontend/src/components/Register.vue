<template>
  <div class="login-form">
    <form action="/examples/actions/confirmation.php" method="post">
        <h2 class="text-center">Inscription</h2>       
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Numero electeur" required="required">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Nom" required="required">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Prenom" required="required">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="email" required="required">
        </div>
        
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Mot de passe" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-block">Inscription</button>
        </div>
               
    </form>
    
</div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      title:'Login',
      msg:''
    }
    
  },
  methods:{
    
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
@media (max-width: 1250px) {
    .login-form {
    width: 80%; 	
    }
}

</style>