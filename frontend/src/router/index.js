import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Vote from '@/components/Vote'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Admin from '@/components/Admin'

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
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
  ]
})