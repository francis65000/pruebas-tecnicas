import { createRouter, createWebHistory } from 'vue-router'
import App from './../App.vue'
import Resultados from './../views/Resultados.vue'

const routes = [
  { path: '/', name:'index',component: App },
  { path: '/resultados', name:'resultados', component: Resultados }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Proporciona la URL base manualmente
  routes
})

export default router
