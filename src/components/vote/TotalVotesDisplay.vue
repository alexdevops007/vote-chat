<template>
  <div class="bg-purple-900 text-white text-center py-4">
    <p class="text-lg">
      Total des votes: <span class="font-bold">{{ totalVotes }}</span>
    </p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  totalVotes: {
    type: Number,
    required: true,
  },
});
</script>
