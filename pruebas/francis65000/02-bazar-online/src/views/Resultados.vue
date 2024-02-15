<template>
  <div class="etiquetas">
      <p>Categoría {{ searchedProducts.length > 0 ? searchedProducts[0].category : '' }}</p>
    </div>
  <div class="grid-container">
    <div class="tarjeta-producto" v-for="producto in searchedProducts" :key="producto.id">
      <router-link :to="{ name: 'Producto', params: { id: producto.id }}">
        <div class="producto">
          <img :src="producto.thumbnail" :alt="producto.title">
          <div class="informacion">
            <div class="nombre">Nombre: {{ producto.title }}</div>
            <div class="categoria">Categoría: {{ producto.category }}</div>
            <div class="categoria">Precio: {{ producto.price }} €</div>
            <div class="rating">Valoración:
              <span v-for="star in starCount(producto.rating)" class="star-filled">⭐</span> {{ producto.rating }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchedProducts: {
      type: Array,
      required: true
    }
  },
  methods: {
    starCount(rating) {
      if (rating >= 4.6) {
        return [1, 2, 3, 4, 5];
      } else {
        return Array.from({ length: Math.round(rating) }, (_, index) => index + 1);
      }
    }
  }
};
</script>

<style scoped></style>
