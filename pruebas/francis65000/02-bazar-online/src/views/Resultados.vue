<template>
  <div class="etiquetas">
    <p>Categoría {{ searchedProducts.length > 0 ? searchedProducts[0].category : '' }}</p>
  </div>
  <div class="grid-container">
    <div class="tarjeta-producto" v-for="producto in searchedProducts" :key="producto.id">
      <router-link to="/producto/">ENLACE</router-link>
        <div class="producto" @click="vistaProducto">
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
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const route = useRouter();

//funcion para contar las estrellas de una valoración en formato numérico (1 a 5)
const starCount = (rating) => {
  if (rating >= 4.6) {
    return [1, 2, 3, 4, 5];
  } else {
    return Array.from({ length: Math.round(rating) }, (_, index) => index + 1);
  }
}

//funcion para guardar la ID y el nombre del producto en localStorage y mostrar la vista del producto unico
/*const guardarIdNombreProducto = (id, nombre) => {
  // Guardar la ID y el nombre del producto en localStorage
  localStorage.setItem('idProducto', id);
  localStorage.setItem('nombreProducto', nombre);

  routerInstance.push({ path: '/producto/'});
}*/
//reccepcion de los productos encontrados en la busqueda
const props = defineProps({
  searchedProducts: {
    type: Array,
    required: true
  }
});

/*const vistaProducto = () =>{
  console.log('hola');
  route.push({ path: '/producto/'})
}*/
</script>

<style scoped></style>
