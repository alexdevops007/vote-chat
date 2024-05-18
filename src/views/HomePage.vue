<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-500 to-purple-950"
  >
    <img :src="logoSrc" alt="Logo du chat" class="w-84 mb-4" />
    <h1 class="text-4xl font-bold mb-4 text-center text-white">{{ title }}</h1>
    <p class="text-lg mb-8 text-center text-white">
      {{ description }}
    </p>
    <router-link
      :to="{ name: 'Vote' }"
      class="bg-purple-950 hover:bg-purple-900 text-white px-6 py-2 rounded-md text-lg"
    >
      Commencer à voter
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";

const logoSrc = ref(
  "https://png.pngtree.com/png-vector/20231020/ourmid/pngtree-cute-kitty-cat-png-image_10236144.png"
);
const title = ref("Bienvenue sur CatMach");
const description = ref(
  "Votez pour les chats les plus mignons et voyez qui est le gagnant !"
);
</script>
