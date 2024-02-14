<template>
  <div>
    <h1>{{ product.title }}</h1>
    <p>ID: {{ product.id }}</p>
    <p>Categoría: {{ product.category }}</p>
    <p>Precio: {{ product.price }}</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      product: {}
    };
  },
  created() {
    // Aquí deberías recuperar los datos del producto correspondiente
    // basado en el ID de la URL (this.id) y asignarlo a this.product
    this.product = {
      id: this.id,
      title: 'Nombre del Producto',
      category: 'Categoría del Producto',
      price: 'Precio del Producto'
    };
  }
};
</script>
