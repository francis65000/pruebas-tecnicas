<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const searchQuery = ref('');
  const router = useRouter();
  const routerInstance = useRouter();
  const searchedProducts = ref([]);
  const selectedProduct = ref(null);

  const buscar = () => {
    const queryValue = searchQuery;
    routerInstance.push({ path: '/resultados', query: { q: searchQuery.value } })
  }


</script>

<template>
  <h1 class="iconoInicio">🛍️</h1>
      <input v-model="searchQuery" type="text" placeholder="Buscar" @keyup.enter="buscar">
      <br>
      <button @click="buscar">Buscar</button>
</template>
