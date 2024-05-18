<template>
  <nav class="bg-purple-500 p-2 font-bold text-white">
    <ul class="flex justify-center space-x-4">
      <router-link v-for="link in links" :key="link.to" :to="link.to">{{
        link.text
      }}</router-link>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const links = ref([
  { to: "/", text: "Accueil" },
  { to: "/vote", text: "Vote" },
  { to: "/cat-list", text: "Liste des chats" },
  { to: "/favorites", text: "Favoris" },
]);
</script>
