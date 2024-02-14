import { createRouter, createWebHistory } from 'vue-router'
import App from './../App.vue'
import Resultados from './../views/Resultados.vue'
import Producto from './../views/Producto.vue'

const routes = [
  { path: '/', name:'index',component: App },
  { path: '/resultados', name:'resultados', component: Resultados },
  { path: '/producto/:id', name: 'Producto', component: Producto }
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Proporciona la URL base manualmente
  routes
})

export default router
