import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Products.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
