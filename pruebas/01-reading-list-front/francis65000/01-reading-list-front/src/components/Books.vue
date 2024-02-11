<script setup>
    import { defineProps, ref, onMounted } from 'vue';
    import data from '../assets/books.json';

    const libreria = ref([]);
    const favoritos = ref([]);

    // Cargar datos del localStorage cuando se monta el componente
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

    // Marcar como favorito
    const marcarComoFavorito = (book) => {
        document.getElementById(`favorito_${book.title}`).innerHTML = '⭐';
        favoritos.value.push(book);
        // Guardar los favoritos actualizados en el localStorage
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
    };

    // Eliminar favorito
    const eliminarFavorito = (book) => {
        document.getElementById(`favorito_${book.title}`).innerHTML = '';
        favoritos.value = favoritos.value.filter(favorito => favorito.title !== book.title);
        // Guardar los favoritos actualizados en el localStorage
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
    };
</script>

<template>
    <h1>📚 LIBRERÍA</h1>
    <div class="titles">
        <div>
            <h3>📘 Catálogo de libros</h3>
            <div class="catalogo">
                <div v-for="book in libreria" :key="book.id" class="tarjetaLibro" @click="marcarComoFavorito(book)">
                    <div>
                        <img class="portada" :src="book.cover" :alt="book.title">
                        <h4>{{ book.title }}<span :id="'favorito_' + book.title"></span></h4>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>