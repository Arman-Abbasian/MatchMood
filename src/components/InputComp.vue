<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps<{
  name: string
  as?: string
  type?: string
  class?: string
  [key: string]: any
}>()
</script>

<template>
  <div class="mb-4">
    <div class="relative">
      <!-- Field -->
      <Field
        v-bind="props"
        :name="props.name"
        :id="props.name"
        :as="props.as || 'input'"
        :type="props.type || 'text'"
        class="border p-2 w-full rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        :class="class"
      />
      <!-- Icon -->
      <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        <slot name="icon" />
      </span>
    </div>
    <!-- Error message -->
    <ErrorMessage :name="props.name" class="text-red-500 text-sm mt-1 block" />
  </div>
</template>
