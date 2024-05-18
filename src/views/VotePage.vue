<template>
  <div class="h-screen flex flex-col justify-between bg-gray-100">
    <h1 class="text-4xl font-bold text-center mb-4 mt-4">Catmash</h1>
    <CatsSection
      v-if="cats.length > 0"
      :cat1="cats[0]"
      :cat2="cats[1]"
      @vote="handleVote"
    />
    <!-- Aucun chat à afficher -->
    <NoCatsToShow v-else />
    <TotalVotesDisplay :total-votes="totalVotes" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCatsStore } from "@/store/modules/cats";
import CatsSection from "@/components/vote/CatsSection.vue";
import NoCatsToShow from "@/components/common/NoCatsToShow.vue";
import TotalVotesDisplay from "@/components/vote/TotalVotesDisplay.vue";

const store = useCatsStore();
const cats = ref([]);
const totalVotes = computed(() => store.totalVotes);

onMounted(async () => {
  await store.fetchAndSetCats();
  getCats();
});

const getCats = () => {
  cats.value = store.getRandomCats(2);
};

const handleVote = (catId) => {
  store.voteCat(catId);
  getCats();
};
</script>

<style scoped>
.h-screen {
  height: 95.6vh;
}
</style>