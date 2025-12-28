<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div class="flex items-center gap-1">
    <span
      class="w-2 h-2 bg-primary-50 rounded-full animate-bounce [animation-delay:-0.3s]"
      :class="class"
    ></span>
    <span
      class="w-2 h-2 bg-primary-50 rounded-full animate-bounce [animation-delay:-0.15s]"
      :class="class"
    ></span>
    <span
      class="w-2 h-2 bg-primary-50 rounded-full animate-bounce"
      :class="class"
    ></span>
  </div>
</template>

<style scoped></style>
