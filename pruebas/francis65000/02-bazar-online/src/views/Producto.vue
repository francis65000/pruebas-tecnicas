<template>
  <div class="productoFicha">
    <h1>Detalles del Producto</h1>
    <p>{{ searchedProducts }}</p>
  </div>
</template>

<script>
export default {
  props: {
    searchedProducts: {
      type: Number,
      required: true
    }
  },

}
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
