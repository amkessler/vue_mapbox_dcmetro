import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '../views/Map.vue'
import SecondMap from '../views/SecondMap.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Map
  },
  {
    path: '/second',
    name: 'second',
    component: SecondMap
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
