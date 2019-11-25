import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/index.vue'
import Create from '../views/create/index.vue'
import List from '../views/list/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
