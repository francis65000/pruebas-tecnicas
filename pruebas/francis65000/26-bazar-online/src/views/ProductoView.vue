<template>
  <div class="about">
    <div class="header">
      <div>
        <h1><router-link to="/" class="router-link">🛍️ Tienda Online</router-link></h1>
      </div>
      <div class="search">
        
      </div>
      <div>
        <a>
          <h2>🛒</h2>
        </a>
      </div>
    </div>
    <div class="contenedor-tarjetas">
      <ProductoUnico :searchedProducts="searchedProducts.items"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductoUnico from '../components/ProductoUnico.vue'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const search = ref(false);
const router = useRouter()
const queryValue = ref(router.currentRoute.value.query.q) // Ref para mantener actualizado el valor de la consulta
const searchedProducts = ref([])

// Puedes utilizar el valor de la consulta como desees
console.log(queryValue.value); // Accede al valor usando .value

onMounted(() => {
  buscar();
});

const buscar = async () => {
  if (queryValue.value === "") {
    try {
      searchedProducts.value = []; 

      const response = await fetch(`https://api-productos-oi50.onrender.com/api/productos`);
      const data = await response.json();
      
      searchedProducts.value = data;
      console.log(data);
      
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      searchedProducts.value = []; 

      const response = await fetch(`https://api-productos-oi50.onrender.com/productos/items?q=${encodeURIComponent(queryValue.value)}`);
      const data = await response.json();
      
      searchedProducts.value = data;
      console.log(data);
      search.value = true;
      
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<style>


</style>
