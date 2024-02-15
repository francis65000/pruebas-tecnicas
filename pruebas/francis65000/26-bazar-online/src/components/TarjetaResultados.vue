<template>
  <div class="categoriesEtiquetas" v-for="(categoria, index) in categoriasUnicas" :key="index">
    <p>{{ categoria }}</p>
  </div>
  <div class="contenedor-tarjetas">
    <div class="tarjeta-producto" v-for="producto in searchedProducts" :key="producto.id">
      <!--<router-link to="/producto/">ENLACE</router-link>-->
      <div class="producto" @click="verProducto(producto.title, producto.id)">
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

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
const categoriasUnicas = ref<string[]>([]);
const router = useRouter();

const props = defineProps({
  searchedProducts: {
    type: Array,
    required: true
  }
});

//funcion para contar las estrellas de una valoración en formato numérico (1 a 5)
const starCount = (rating) => {
  if (rating >= 4.6) {
    return [1, 2, 3, 4, 5];
  } else {
    return Array.from({ length: Math.round(rating) }, (_, index) => index + 1);
  }
}

//mostrar el producto seleccionado
const verProducto = (title, id) => {
  const queryValue = title;
  router.push({ path: '/producto/' + id, query: { q: queryValue } })
}

onMounted(() => {

  categoriasUnicas.value = []; //limpia la variable cada vez que se carga un nuevo resultado de búsqueda
  const categoriasSinRepetir: Set<string> = new Set(); // Usamos un Set para evitar duplicados

  if (props.searchedProducts) {
    props.searchedProducts.forEach(producto => {
      categoriasSinRepetir.add(producto.category);
    });

    categoriasUnicas.value = Array.from(categoriasSinRepetir); // Convertimos el Set a un array y lo asignamos a categoriasUnicas
    console.log(categoriasUnicas.value);
  }
});

</script>

<style scoped></style>
