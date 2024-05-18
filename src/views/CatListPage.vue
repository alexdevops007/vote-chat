<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-3xl font-bold mb-8 text-center">Tous les chats</h1>

    <!-- Total des votes -->
    <div class="mb-6 flex justify-center items-center">
      <p class="text-lg font-bold mr-2">Total des votes :</p>
      <p class="text-lg">{{ totalVotes }}</p>
    </div>

    <!-- Affichage des chats -->
    <div
      v-if="displayedCatsSorted.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <div
        v-for="catWithScore in displayedCatsSorted"
        :key="catWithScore.id"
        class="flex flex-col items-center bg-gray-100 rounded-lg shadow-md p-4 transition duration-300 transform hover:scale-105"
      >
        <img
          :src="catWithScore.url"
          class="w-32 h-32 rounded-full shadow-lg mb-4"
          alt="Cat Image"
        />
        <p class="text-lg mb-2">Score : {{ getCatVotes(catWithScore.id) }}</p>
        <button
          @click="toggleFavorite(catWithScore)"
          :class="{
            'bg-purple-500': isFavorite(catWithScore.id),
            'bg-gray-300': !isFavorite(catWithScore.id),
          }"
          class="px-4 py-2 rounded-lg text-white transition duration-300 transform hover:scale-105"
        >
          {{
            isFavorite(catWithScore.id)
              ? "Retirer des favoris"
              : "Ajouter aux favoris"
          }}
        </button>
      </div>
    </div>

    <!-- Aucun chat à afficher -->
    <NoCatsToShow v-else />

    <!-- Pagination -->
    <div class="mt-8 flex justify-center items-center space-x-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        Précédent
      </button>
      <span class="text-lg">Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCatsStore } from "@/store/modules/cats";
import NoCatsToShow from "@/components/common/NoCatsToShow.vue";

const store = useCatsStore();
const catsWithScore = ref([]);
const currentPage = ref(1);

onMounted(() => {
  fetchCatsWithScore();
});

const fetchCatsWithScore = () => {
  catsWithScore.value = store.getCatsWithScore();
};

const totalPages = computed(() => Math.ceil(catsWithScore.value.length / 6));
const displayedCats = computed(() => {
  const startIndex = (currentPage.value - 1) * 6;
  const endIndex = startIndex + 6;
  return catsWithScore.value.slice(startIndex, endIndex);
});

const displayedCatsSorted = computed(() => {
  return [...displayedCats.value].sort((a, b) => {
    return getCatVotes(b.id) - getCatVotes(a.id);
  });
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const toggleFavorite = (cat) => {
  store.toggleFavorite(cat);
};

const isFavorite = (id) => {
  return store.isFavorite(id);
};

const getCatVotes = (id) => {
  return store.getCatVotes(id);
};

// Calcul de la somme des votes de tous les chats
const totalVotes = computed(() => {
  return Object.values(store.votes).reduce((total, votes) => total + votes, 0);
});
</script>

<style scoped>
.pagination-btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #A855F7;
  color: #fff;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-btn:hover {
  background-color: #7235ac;
}

.pagination-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>