import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import AllProducts from '../views/product/AllProducts.vue'
import Product from '../views/product/SpecificProduct.vue'
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    component: Products,
    props: true,

    // component: () =>
    //   import(/* webpackChunkName: "about" */ '../views/Products.vue')
    children: [
      {
        path: '/products',
        name: 'Products',
        component: AllProducts
      },
      {
        path: '/products/:productName',
        props: true,
        name: 'Product',
        component: Product
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
