<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand ><router-link :to="{ name: 'Home' }">E-VOTE</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item ><router-link :to="{ name: 'Home' }">Home</router-link></b-nav-item>
          <b-nav-item ><router-link to="/vote">Vote</router-link></b-nav-item>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button size="sm" class="my-2 my-sm-0" type="submit"
            >Search</b-button
          >
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