<script setup lang="ts">
import { ChartBarSquareIcon } from '@heroicons/vue/24/outline'

const { title, value } = defineProps<{
  title: string
  value: number | string
  containerClass?: string
}>()
</script>

<template>
  <div
    class="flex justify-between gap-4 w-60 shadow-2xl text-primary-50 px-2 py-4 rounded-lg mb-10"
    :class="containerClass"
  >
    <div class="flex flex-col gap-2">
      <h2 class="whitespace-nowrap">{{ title }}</h2>
      <p>{{ value }}</p>
    </div>
    <ChartBarSquareIcon class="w-8 text-primary-50" />
  </div>
</template>
<style scoped></style>
