<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { defineProps } from 'vue'

const props = defineProps<{
  name: string
  type?: string
  placeholder?: string
}>()
</script>

<template>
  <div class="mb-4">
    <div class="relative">
      <!-- Field -->
      <Field
        :name="name"
        :type="type || 'text'"
        :id="name"
        :placeholder="placeholder"
        class="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
      <!-- Icon -->
      <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        <slot name="icon" />
      </span>
    </div>
    <!-- Error message -->
    <ErrorMessage :name="name" class="text-red-500 text-sm mt-1 block" />
  </div>
</template>

<style scoped>
/* optional styles */
</style>
