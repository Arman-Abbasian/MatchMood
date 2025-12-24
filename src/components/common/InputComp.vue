<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps<{
  name: string
  label?: string
  as?: string
  type?: string
  value?: string | number
  placeholder?: string
  class?: string
  [key: string]: any
}>()
</script>

<template>
  <div class="mb-4">
    <!-- برای Radio و Checkbox -->
    <div
      v-if="props.type === 'radio' || props.type === 'checkbox'"
      class="flex items-center gap-2"
    >
      <Field
        :name="props.name"
        :id="`${props.name}-${props.value}`"
        :type="props.type"
        :value="props.value"
        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <label
        :for="`${props.name}-${props.value}`"
        class="text-sm font-medium text-gray-700 cursor-pointer"
      >
        {{ props.label }}
      </label>
    </div>

    <!-- برای Input و Textarea عادی -->
    <div v-else>
      <label
        v-if="props.label"
        :for="props.name"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        {{ props.label }}
      </label>

      <div class="relative">
        <Field
          :name="props.name"
          :id="props.name"
          :type="props.type || 'text'"
          :as="props.as || 'input'"
          :placeholder="props.placeholder"
          class="border border-primary-100 p-2 w-full rounded-lg focus:outline-none placeholder:text-sm"
          :class="[props.class, props.as === 'textarea' ? 'resize-none' : '']"
        />

        <!-- Icon (فقط برای input) -->
        <span
          v-if="$slots.icon && props.as !== 'textarea'"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        >
          <slot name="icon" />
        </span>
      </div>

      <!-- Error message -->
      <ErrorMessage
        :name="props.name"
        class="text-red-500 text-sm mt-1 block"
      />
    </div>

    <!-- Error برای Radio/Checkbox (فقط یک بار نمایش بده) -->
    <ErrorMessage
      v-if="props.type === 'radio' || props.type === 'checkbox'"
      :name="props.name"
      class="text-red-500 text-sm mt-1 block"
    />
  </div>
</template>
