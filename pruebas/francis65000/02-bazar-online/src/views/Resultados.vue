<template>
  <div class="tarjeta">
    <h3>Resultados de la búsqueda: {{ search }}</h3>
    <div class="tarjeta-producto" v-for="producto in products" :key="producto.id">
      <p></p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },

});

</script>

<style scoped>
</style>
