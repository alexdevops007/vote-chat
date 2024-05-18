<template>
  <div class="relative">
    <img
      :src="cat.url"
      class="heart-mask rounded-lg shadow-lg w-60 h-auto cursor-pointer"
      @click="handleVote(cat.id)"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["cat", "onVote"]);

const handleVote = (catId) => {
  // Émettre un événement 'vote' avec l'ID du chat en appelant la fonction de rappel fournie
  if (typeof props.onVote === "function") {
    props.onVote(catId);
  }
};
</script>

<style scoped>
.heart-mask {
  width: 70%;
  height: auto;
  -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>')
    center / cover no-repeat;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>')
    center / cover no-repeat;
}
</style>
