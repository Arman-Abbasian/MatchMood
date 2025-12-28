<script setup lang="ts">
import Spinner from './Spinner.vue'

defineProps<{ text: string; loading?: boolean; disabled?: boolean }>()
</script>

<template>
  <button
    type="submit"
    class="flex justify-center items-center bg-primary-500 text-white w-full py-2 rounded-lg hover:bg-primary-100 transition duration-200 font-medium cursor-pointer hover:text-primary-500 h-12"
    :disabled="loading || disabled"
  >
    <Spinner v-if="loading" />
    <span v-else>{{ text }}</span>
  </button>
</template>

<style scoped></style>
