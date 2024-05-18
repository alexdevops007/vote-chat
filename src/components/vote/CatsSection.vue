<template>
  <div class="flex flex-grow">
    <div class="w-1/2 bg-gray-200 flex items-center justify-center">
      <div class="text-center">
        <CatCard :cat="cat1" @vote="handleVote" />
      </div>
    </div>
    <div class="w-1/2 bg-gray-100 flex items-center justify-center">
      <div class="text-center">
        <CatCard :cat="cat2" @vote="handleVote" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import CatCard from "@/components/common/CatCard.vue";

defineProps({
  cat1: {
    type: Object,
    required: true
  },
  cat2: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['vote']);

const handleVote = (catId) => emit('vote', catId);
</script>../common/CatCard.vue