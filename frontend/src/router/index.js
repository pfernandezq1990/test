import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import CreateReservation from '../views/CreateReservation.vue'
import AddContact from '../views/AddContact.vue'
import Contacts from '../views/Contacts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/CreateReservation',
    name: 'CreateReservation',
    component: CreateReservation,
  },
  {
    path: '/AddContact',
    name: 'AddContact',
    component:  AddContact,
  },
  {
    path: '/Contacts',
    name: 'Contacts',
    component:  Contacts,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
