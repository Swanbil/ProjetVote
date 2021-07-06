<template>
  <div>
  <b-navbar  toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand  class="mx-2 px-2 "><router-link :to="{ name: 'Home' }" class="logo" id="log">E-VOTE</router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav >
        <b-nav-item class="px-2"><router-link :to="{ name: 'Home' }" class="logo">Home</router-link></b-nav-item>
        <b-nav-item v-if="!isAdmin" class="px-2"><router-link to="/vote">Vote</router-link></b-nav-item>
        <b-nav-item v-if="isAdmin" class="px-2"><router-link to="/admin">Admin</router-link></b-nav-item>
      </b-navbar-nav>

       <b-navbar-nav class="ms-auto">
          <b-button  v-if="!isLog" size="sm" class="btn my-2 my-sm-0 mx-2" type="submit" variant="light">
            <router-link to="/login" class="btn-log" >Connexion</router-link>
          </b-button>
          <b-button v-else  @click="logOut()" size="sm" class="btn my-2 my-sm-0 mx-2" type="submit" variant="secondary">
            Deconnexion
          </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
</div> 
  
</template>


<script>
import axios from "axios";
export default {
  name: "NavBar",
  props:{
    isLog: Boolean,
    isAdmin: Boolean
  },
  data(){
    return{
      stateIsLog:false,
      stateIsAdmin:false
    };
  },
  methods:{
    async logOut(){
      this.stateIsLog = false
      this.stateIsAdmin = false
      localStorage.removeItem('token')
      this.$emit('clicked', this.stateIsLog)
      this.$emit('changeAdmin', this.stateIsAdmin)
      const response = await axios.post('/api/logout')
      console.log('resp logout = ',response.data.message)
      this.$router.push({name:'Home'})
    }
  }
};
</script>

<style scoped>
.navbar.navbar-dark.bg-dark {
  background-color: #557ebb !important;
  font-weight: bold;
}
a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.navbar-brand{
  background-color: #2b70d8 ;
}
.navbar-brand:hover{
  background-color: #eeeeee57 ;
}
.nav-item:hover{
  background-color: #eeeeee57 ;
  
}

.btn {
  font-weight: bold;
  padding: 7px;
  float: right;
  border-radius: 8px;
  
}
.btn:hover{
  background-color: #c9c4c4;
  border-radius: 8px;
}
.btn-log {
  color: black;
  border-radius: 8px;
}
#log{
  border-radius: 10px;
}

</style>