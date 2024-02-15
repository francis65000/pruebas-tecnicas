<script setup lang="ts">
import { useRouter } from 'vue-router';

const route = useRouter();

const siguientePagina = () =>{

  route.push({ path: '/resultados' });

}
</script>

<template>
  <h1>Inicio</h1>
  <button @click="siguientePagina">IR</button>
</template>

<style scoped>

</style>
