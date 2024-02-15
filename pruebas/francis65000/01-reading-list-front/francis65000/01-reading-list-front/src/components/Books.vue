<template>
    <div class="titles">
        <div>
            <h3>📘 Catálogo de libros</h3>
            <div class="catalogo" id="cajaCatalogo">
                <div v-for="book in libreria" :key="book.id" class="tarjetaLibro" @click="marcarComoFavorito(book)">
                    <div>
                        <img class="portada" :src="book.cover" :alt="book.title">
                        <h4>{{ book.title }}<span :id="'favorito_' + book.title"></span></h4>
                        <p>Género: {{ book.genre }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>⭐ Favoritos</h3>
            <div class="tarjetaFavoritos">
                <div v-for="favorito in favoritos" :key="favorito.id">
                    <div>
                        <img class="portada" :src="favorito.cover" :alt="favorito.title"
                            @click="eliminarFavorito(favorito)">
                        <h4>{{ favorito.title }}<span id="'favorito_' + favorito.title">⭐</span></h4>
                        <p>Género: {{ favorito.genre }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';

const props = defineProps({
    libreria: {
        type: Array,
        required: true
    }
});

// Declaración de la variable reactiva favoritos
const favoritos = ref([]);

// Cargar datos de favoritos del localStorage al montar el componente
onMounted(() => {
  const storedFavoritos = localStorage.getItem('favoritos');
  if (storedFavoritos) {
    favoritos.value = JSON.parse(storedFavoritos);
  }
});

// Watcher para guardar cambios en el localStorage
watch(favoritos, (newFavoritos) => {
  localStorage.setItem('favoritos', JSON.stringify(newFavoritos));
});

// Marcar un libro como favorito
const marcarComoFavorito = (book) => {
    const index = favoritos.value.findIndex(fav => fav.title === book.title);
    if (index === -1) {
        document.getElementById('favorito_' + book.title).innerHTML = '⭐';
        favoritos.value.push(book); // Actualiza favoritos
    }
    // Guardar cambios en localStorage
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
};

// Eliminar un favorito
const eliminarFavorito = (favorito) => {
    document.getElementById('favorito_' + favorito.title).innerHTML = '';
    favoritos.value = favoritos.value.filter(fav => fav.title !== favorito.title); // Actualiza favoritos
    // Guardar cambios en localStorage
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
};

</script>
  
<style></style>
