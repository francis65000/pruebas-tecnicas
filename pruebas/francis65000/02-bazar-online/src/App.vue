<template>
    <div>
      <div class="buscador" v-if="router.path === '/'">
        <h1 class="iconoInicio">🛍️</h1>
        <input v-model="searchQuery" type="text" placeholder="Buscar">
        <br>
        <button @click="buscar">Buscar</button>
      </div>   
  
      <div class="circuitos" v-else-if="router.path === '/resultados'">
        <div class="header">
          <div>
            <h1><router-link to="/" class="router-link">🛍️</router-link></h1>
          </div>
          <div class="search">
            <input v-model="searchQuery" type="text" placeholder="Buscar">
            <button @click="buscar">Buscar</button>
          </div>
          <div>
            <a @click="openCart"><h2>🛒</h2></a>
          </div>
        </div>
        
        <Resultados :filteredProducts="filteredProducts" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const searchQuery = ref('');
  const products = ref([]);
  const router = useRoute();
  const routerInstance = useRouter();
  const filteredProducts = ref([]);
  
  const dataProducts = [
      { id: 1, title: 'TV', category: 'Electrónica' },
      { id: 2, title: 'pantalon vaquero', category: 'Ropa' },
      { id: 3, title: 'Cuberteria 12 piezas', category: 'Hogar' },
      { id: 4, title: 'Portatil', category: 'Electrónica' }
  ];
  
  const buscar = () => {
      // Actualizar la URL con el término de búsqueda
      routerInstance.push({ path: '/resultados', query: { search: searchQuery.value } });
  
      // Filtrar productos
      const terminoBusqueda = new RegExp(`^${searchQuery.value}`, 'i');
      filteredProducts.value = dataProducts.filter(
          producto => terminoBusqueda.test(producto.title) || terminoBusqueda.test(producto.category)
      );
      console.log(filteredProducts.value);
  }
  
  // Observar cambios en la búsqueda para actualizar productos filtrados
  onMounted(() => {
      const updateFilteredProducts = () => {
          const terminoBusqueda = new RegExp(`^${searchQuery.value}`, 'i');
          filteredProducts.value = dataProducts.filter(
              producto => terminoBusqueda.test(producto.title) || terminoBusqueda.test(producto.category)
          );
      };
  
      // Observar cambios en searchQuery
      watch(searchQuery, updateFilteredProducts);
      updateFilteredProducts();
  });
  </script>
    
  <style scoped></style>
  