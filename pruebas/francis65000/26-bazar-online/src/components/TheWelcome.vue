<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('');
const router = useRouter();
const routerInstance = useRouter();
const searchedProducts = ref([]);
const selectedProduct = ref(null);

const buscar = () => {
  const queryValue = searchQuery.value;
  routerInstance.push({ path: '/resultados', query: { q: queryValue } })
}


</script>

<template>
  <div class="inicio">
    <h2 class="iconoInicio">🛍️</h2>
    <h1>Tienda Online</h1>
    <input v-model="searchQuery" type="text" placeholder="Buscar" @keyup.enter="buscar">
    <br>
    <button @click="buscar">Buscar</button>
  </div>
</template>
