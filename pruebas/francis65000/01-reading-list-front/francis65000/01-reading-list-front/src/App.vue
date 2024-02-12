<template>
  <div class="header">
    <div>
      <h1>📚 LIBRERÍA</h1>
    </div>
    <div class="buscador">
      <form>
        <input class="cajaBuscador" type="text" v-model="inputValue" placeholder="🔍 Buscar libro..." @input="buscaLibro">
      </form>
    </div>
  </div>
  <div v-if="mostrarResultados">
    <div class="titles">
      <div>
        <h3>🔍 Resultados de la búsqueda:</h3>
        <div class="catalogo" id="cajaCatalogo">
          <div v-for="book in resultadoBusqueda" :key="book.id" class="tarjetaLibro">
            <div>
              <img class="portada" :src="book.cover" :alt="book.title">
              <h4>{{ book.title }}<span :id="'favorito_' + book.title"></span></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Books :libreria="libreria" :favoritos="favoritos"></Books>
  </div>
</template>

<script setup>
import Books from './components/Books.vue';
import { ref, onMounted, watch } from 'vue';
import data from './assets/books.json';

// Declaración de variables reactivas
const inputValue = ref('');
const resultadoBusqueda = ref([]);
const libreria = ref([]);
const favoritos = ref([]);
const mostrarResultados = ref(false);

// Cargar datos del localStorage 
onMounted(() => {
  const storedLibreria = localStorage.getItem('libreria');
  const storedFavoritos = localStorage.getItem('favoritos');

  if (storedLibreria) {
    libreria.value = JSON.parse(storedLibreria);
  } else {
    libreria.value = data.library.map((data) => data.book);
    // Guardar la librería inicial en el localStorage
    localStorage.setItem('libreria', JSON.stringify(libreria.value));
  }

  if (storedFavoritos) {
    favoritos.value = JSON.parse(storedFavoritos);
  }
});

// Watcher para guardar cambios en el localStorage
watch(libreria, (newLibreria) => {
  localStorage.setItem('libreria', JSON.stringify(newLibreria));
});

watch(favoritos, (newFavoritos) => {
  localStorage.setItem('favoritos', JSON.stringify(newFavoritos));
});

// Buscador
const buscaLibro = () => {
  const terminoBusqueda = new RegExp(`^${inputValue.value}`, 'i');

  if (inputValue.value === '') {
    mostrarResultados.value = false; // Si el campo de búsqueda está vacío, mostrar la vista de Books
    return;
  }

  // Filtrar
  resultadoBusqueda.value = libreria.value.filter((libro) => terminoBusqueda.test(libro.title));

  if (resultadoBusqueda.value.length === 0) {
    //mostrarResultados.value = false; // No se encontraron resultados, ocultar la vista de resultados
    console.log('No se encontraron resultados');
  }

  // Actualizar el estado para mostrar o no los resultados
  mostrarResultados.value = resultadoBusqueda.value.length > 0;
};
</script>

<style scoped>
</style>
