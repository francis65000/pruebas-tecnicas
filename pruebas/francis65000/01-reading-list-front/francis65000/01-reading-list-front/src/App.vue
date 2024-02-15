<template>
  <div class="header">
    <div>
      <h1>📚 LIBRERÍA</h1>
    </div>
    <div class="filtros">
      <label for="numero">Género</label>
      <select v-model="selectedCategory" @change="buscaCategoria(selectedCategory)" class="cajaSelect">
        <option value="">Todas las categorías</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <div class="filtros">
      <label for="numero">Número de páginas</label>
      <div>
        <input class="rango" type="range" id="numero" name="numero" min="1" max="2000" v-model="valorSeleccionado"
          @input="buscaPagina">
        <span>{{ valorSeleccionado }}</span>
      </div>
    </div>
    <div class="buscador">
      <form>
        <label for="numero">Buscador</label>
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
              <p>Género: {{ book.genre }}</p>
              <p>Páginas: {{ book.pages }}</p>
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
const selectedCategory = ref('');
const categories = ref([]);
const valorSeleccionado = ref(1);

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

// Watcher para llamar a extractCategories cuando libreria cambie
watch(libreria, () => {
  extractCategories();
});

// Función para extraer categorías de la librería
const extractCategories = () => {
  const allCategories = new Set();
  libreria.value.forEach(book => {
    allCategories.add(book.genre);
  });
  categories.value = Array.from(allCategories);
  console.log(categories.value);
};
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
  console.log("Seleccionado: ", terminoBusqueda);

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

const buscaCategoria = (selectedCategory) => {
  console.log("Género seleccionado: ", selectedCategory.value);

  // Si el género seleccionado es vacío, no realizamos ninguna búsqueda
  if (!selectedCategory) {
    mostrarResultados.value = false; // Si el campo de búsqueda está vacío, mostrar la vista de Books
    return;
  }

  // Filtrar los libros por el género seleccionado
  resultadoBusqueda.value = libreria.value.filter((libro) => libro.genre === selectedCategory);
  console.log("Resultado de la búsqueda: ", resultadoBusqueda.value);

  if (resultadoBusqueda.value.length === 0) {
    console.log('No se encontraron resultados para el género seleccionado');
  }

  // Actualizar el estado para mostrar o no los resultados
  mostrarResultados.value = resultadoBusqueda.value.length > 0;
};

const buscaPagina = (event) => {
  valorSeleccionado.value = event.target.value;

  console.log("Número de páginas seleccionado: ", valorSeleccionado.value);

  // Filtrar los libros por el número de páginas menor que el valor seleccionado
  resultadoBusqueda.value = libreria.value.filter((libro) => libro.pages <= valorSeleccionado.value);
  console.log("Resultado de la búsqueda: ", resultadoBusqueda.value);

  if (resultadoBusqueda.value.length === 0) {
    console.log('No se encontraron resultados para el número de páginas seleccionado');
  }

  // Actualizar el estado para mostrar o no los resultados
  mostrarResultados.value = resultadoBusqueda.value.length > 0;
};
</script>

<style scoped></style>
