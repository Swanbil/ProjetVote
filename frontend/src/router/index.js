import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Vote from '@/components/Vote'

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
      }
  ]
})