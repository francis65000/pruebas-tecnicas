<template>
  <div class="tarjeta">
  
    <div class="tarjeta-producto" v-if="filteredProducts.length > 0">
      <h3>Resultados de la búsqueda: {{ search }}</h3>
      <div class="producto" v-for="producto in filteredProducts" :key="producto.id">
        <p>{{ producto.title }}</p>
      </div>
    </div>
    <div v-else>
      <p>No se encontraron resultados</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  filteredProducts: {
    type: Array,
    required: true,
    
  },

});
</script>

<style scoped>
/* Tu estilo existente */
</style>
