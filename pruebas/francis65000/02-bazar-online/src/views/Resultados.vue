<template>
  <div class="tarjeta">
    <h3>Resultados de la búsqueda: {{ search }}</h3>
    <div class="tarjeta-producto" v-for="producto in filteredProducts" :key="producto.id">
      <p> {{ producto.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";

const props = defineProps({
  filteredProducts: {
    type: Array,
    required: true,
  },

});

</script>

<style scoped>
</style>
