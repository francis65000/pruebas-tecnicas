<template>
    <div class="tarjeta-producto-unico" v-for="producto in searchedProducts" :key="producto.id">
        <!--<router-link to="/producto/">ENLACE</router-link>-->
        <div>
            <div class="galeria">
                <div >
                    <img :src="producto.thumbnail" :alt="producto.title">
                </div>
                <div class="imagesGalery">
                    <div v-for="(image, index) in producto.images" :key="index">
                        <img :src="image" :alt="'Image ' + (index + 1)">
                    </div>
                </div>
            </div>
            <div class="informacionUnica">
                <div class="nombre"><h1>{{ producto.title }}</h1></div>
                <div class="categoria"><b>Categoría:</b> {{ producto.category }}</div>
                <div class="categoria"><b>Descripción:</b> {{ producto.description }}</div>
                <div class="categoria"><b>Precio:</b><span>{{ producto.price }} €</span></div>
                <div class="rating"><b>Valoración:</b>
                    <span v-for="star in starCount(producto.rating)" class="star-filled">⭐</span> {{ producto.rating }}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router'

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
</script>
  
<style scoped></style>