import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultadosView from '../views/ResultadosView.vue'
import ProductoView from '../views/ProductoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: true
    },
    {
      path: '/resultados',
      name: 'resultados',
      component: ResultadosView,
      props: true
    },
    {
      path: '/producto/:id',
      name: 'producto',
      component: ProductoView,
      props: true
    }
  ]
})

export default router
