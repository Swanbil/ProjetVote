<template>
  <div id="app">
    <body>
      <div id="page-container">
        <NavBar :isLog="isLog" @clicked="onChangeLog" :isAdmin="isAdmin" @changeAdmin="onChangeAdmin"></NavBar>
        <div id="content-wrap">
          <router-view
            class="container"
            :isLog="isLog"
            :isAdmin="isAdmin"
            @clicked="onChangeLog"
            @changeAdmin="onChangeAdmin"
          ></router-view>
        </div>
        <Footer id="footer"></Footer>
      </div>
    </body>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import Cookies from 'js-cookie';

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      isLog: false,
      isAdmin:false
    };
  },
  methods: {
    
    onChangeLog(value) {
      this.isLog = value;
    },
    onChangeAdmin(value) {
      this.isAdmin = value;
    },
  },
  //check while refreshing that the user is always connected
  mounted(){
      const cookieLog =Cookies.get('connect.sid')
      if(cookieLog !==undefined){
        this.isLog = true
      }
      
    },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  position: relative;
  min-height: 50vh;
}

#page-container {
  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: 2.5rem; /* Footer height */
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem; /* Footer height */
}
</style>