import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Vote from '@/components/Vote'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Admin from '@/components/Admin'
import AddElection from '@/components/AddElection'
import ModifyElection from '@/components/ModifyElection'
import AddVotant from '@/components/AddVotant'
import ModifyVotant from '@/components/ModifyVotant'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/vote',
      name: 'Vote',
      component: Vote
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/addElection',
      name: 'AddElection',
      component: AddElection
    },
    {
      path: '/modElection',
      name: 'ModifyElection',
      component: ModifyElection
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/addVotant',
      name: 'AddVotant',
      component: AddVotant
    },
    {
      path: '/modVotant',
      name: 'ModifyVotant',
      component: ModifyVotant
    },

  ]
})