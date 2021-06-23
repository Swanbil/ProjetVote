<template>
  <div class="login-form">
    
    <div class="form">
      <h2 class="text-center">Connexion</h2>
      <div class="form-group">
        <input
          type="text"
          v-model="user.numElec"
          class="form-control"
          placeholder="Numero electeur"
          required="required"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="user.password"
          class="form-control"
          placeholder="Mot de passe"
          required="required"
        />
      </div>
      <div class="form-group">
        <button type="submit" @click="logUser()" class="btn btn-block">
          Connexion
        </button>
      </div>
      <div class="clearfix">
        <p class="text-center">
          <router-link to="/register">Créer un compte</router-link>
        </p>
      </div>
    </div>
    <div class="response">
      {{ response }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  props: {
    isLog: Boolean,
  },
  data() {
    return {
      title: "Login",
      response: "",
      user: {
        numElec: "",
        password: "",
      },
      stateIsLog:false,
      stateIsAdmin:false
    };
  },
  methods: {
    async logUser() {
      try{
        const response = await axios.post("/api/login", this.user);
        console.log(response.data)
        this.stateIsAdmin = response.data.isAdmin
        this.stateIsLog = true
        this.$emit('clicked', this.stateIsLog)
        this.$emit('changeAdmin', this.stateIsAdmin)
        this.$router.push({name:'Home'})
        
      }
      catch (error){
        this.response = error.response.data.message;
      }
    },
  },
};
</script>


<style scoped>
.login-form {
  width: 30%;
  margin: 50px auto;
  font-size: 15px;
}
.login-form .form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 40px;
}
.login-form h2 {
  margin: 0 0 15px;
  font-weight: bold;
  margin-bottom: 40px;
}
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
  margin-bottom: 20px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  background-color: #557ebb;
  color: rgb(255, 255, 255);
}
.clearfix {
  text-decoration: none;
}
.response {
  text-align: center;
  background-color: rgb(196, 105, 105);
  font-weight: bold;
}

@media (max-width: 1250px) {
  .login-form {
    width: 80%;
  }
}
</style>