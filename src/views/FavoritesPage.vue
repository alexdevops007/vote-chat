<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Chats favoris</h1>
    <div v-if="favorites.length > 0" class="grid grid-cols-3 gap-4">
      <CatCard v-for="cat in favorites" :key="cat.id" :cat="cat" :onToggleFavorite="toggleFavorite" />
    </div>
    <!-- Aucun chat à afficher -->
    <NoCatsToShow v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCatsStore } from '@/store/modules/cats';
import CatCard from '@/components/common/CatCard.vue';
import NoCatsToShow from "@/components/common/NoCatsToShow.vue";

const store = useCatsStore();
const favorites = ref([]);

const toggleFavorite = (catId) => store.toggleFavorite(catId);

onMounted(() => {
  favorites.value = store.cats.filter(cat => store.isFavorite(cat.id));
});
</script>