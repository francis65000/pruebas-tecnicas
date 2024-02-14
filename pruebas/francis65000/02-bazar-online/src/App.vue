<template>
  <div>
    <div class="buscador" v-if="router.path === '/'">
      <h1 class="iconoInicio">🛍️</h1>
      <input v-model="searchQuery" type="text" placeholder="Buscar">
      <br>
      <button @click="buscar">Buscar</button>
    </div>

    <div v-else-if="router.path === '/resultados'">
      <div class="header">
        <div>
          <h1><router-link to="/" class="router-link">🛍️</router-link></h1>
        </div>
        <div class="search">
          <input v-model="searchQuery" type="text" placeholder="Buscar">
          <button @click="buscar">Buscar</button>
        </div>
        <div>
          <a @click="openCart">
            <h2>🛒</h2>
          </a>
        </div>
      </div>
      <div class="resultadoBusqueda">
        <h3>Resultados de la búsqueda</h3>
        <div class="tarjeta-producto" v-if="searchedProducts.length > 0">
          <div v-for="producto in searchedProducts" :key="producto.id">
            <router-link :to="{ name: 'Producto', params: { id: producto.id } }">
              <div class="producto">
                <p>{{ producto.title }}</p>
                <p>Categoría: {{ producto.category }}</p>
              </div>
            </router-link>
          </div>
        </div>
        <div v-else>
          <p>No se encontraron resultados</p>
        </div>
      </div>
    </div>
    <div v-else-if="router.path === '/producto/:id'">
      <h3>Vista única de un producto</h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const searchQuery = ref('');
const router = useRoute();
const routerInstance = useRouter();
const searchedProducts = ref([]);

const buscar = async () => {
  try {
    const response = await fetch(`https://api-productos-oi50.onrender.com/api/items?q=${searchQuery.value}`);
    const data = await response.json();
    
    // 1. Console.log de lo que se ha encontrado en la búsqueda
    console.log("Resultados de la búsqueda:", data.products);
    
    // 2. Guardar los resultados de la búsqueda en un array y pasarlos a la vista de resultados.vue
    searchedProducts.value = data.products;
    routerInstance.push({ path: '/resultados' });
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped></style>
