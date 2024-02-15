<template>
  <div>
    <div class="buscador" v-if="router.path === '/'">
      <h1 class="iconoInicio">🛍️</h1>
      <input v-model="searchQuery" type="text" placeholder="Buscar" @keyup.enter="buscar">
      <br>
      <button @click="buscar">Buscar</button>
    </div>

    <div v-else-if="router.path === '/resultados'">
      <div class="header">
        <div>
          <h1><router-link to="/" class="router-link">🛍️</router-link></h1>
        </div>
        <div class="search">
          <input v-model="searchQuery" type="text" placeholder="Buscar" @keyup.enter="buscar">
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
        <Resultados :searchedProducts="searchedProducts.items" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Resultados from './views/Resultados.vue';

  const searchQuery = ref('');
  const router = useRouter();
  const routerInstance = useRouter();
  const searchedProducts = ref([]);
  const selectedProduct = ref(null);

  const buscar = async () => {
    try {
      const response = await fetch(`https://api-productos-oi50.onrender.com/productos/items?q=${encodeURIComponent(searchQuery.value)}`);
      const data = await response.json()

      searchedProducts.value = data;
      
      routerInstance.push({ path: '/resultados' });
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style scoped></style>