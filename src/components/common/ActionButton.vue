<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <button
    type="submit"
    class="bg-primary-500 text-white w-full py-2 rounded-lg hover:bg-primary-100 hover:text-primary-500 transition duration-200 font-medium cursor-pointer"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
