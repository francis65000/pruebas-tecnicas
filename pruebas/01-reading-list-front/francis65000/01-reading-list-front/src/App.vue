<script setup>
import Books from './components/Books.vue';
import { ref, onMounted } from 'vue';

const arrayLibros = ref([]);
</script>

<template>
    <Books :books="arrayLibros"></Books>
</template>

<style scoped></style>
