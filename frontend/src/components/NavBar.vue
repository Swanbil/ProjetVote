<template>
<div>
  <b-navbar  toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand  class="mx-2 px-2 bg-dark"><router-link :to="{ name: 'Home' }" class="logo">E-VOTE</router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav >
        <b-nav-item class="px-2"><router-link :to="{ name: 'Home' }" class="logo">Home</router-link></b-nav-item>
        <b-nav-item class="px-2"><router-link to="/vote">Vote</router-link></b-nav-item>
      </b-navbar-nav>


       <b-navbar-nav class="ms-auto">
        
          
          <b-button size="sm" class="my-2 my-sm-0 mx-2" type="submit" variant="light">Se connecter</b-button>
       

        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div> 

</template>


<script>

export default {
  name: "NavBar",
};
</script>

<style scoped>
.navbar.navbar-dark.bg-dark{
    background-color: #557ebb!important;
    font-weight: bold;
 }


a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
a:hover{
  background-color: rgb(218, 211, 211);
}
button{
  font-weight: bold;
  padding:10px;
  float:right;
}


</style>