<script setup lang="ts">
import { useRouter } from 'vue-router';

const route = useRouter();

const siguientePagina = () =>{
  console.log('Siguiente pagina')

  route.push({ path: '/productos' });

}
</script>

<template>
  <h1>Resultados</h1>
  <button @click="siguientePagina">IR</button>
</template>

<style scoped>

</style>