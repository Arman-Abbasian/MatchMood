<script setup lang="ts">
import { ref, computed } from 'vue'
import { Field } from 'vee-validate'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

type Option = {
  id: string | number
  name: string
  [key: string]: any
}

const props = defineProps<{
  name: string
  label?: string
  options: Option[]
  placeholder?: string
  // اگر می‌خواهید id بفرستید بذارید true، اگر کل object رو می‌خواهید false
  returnId?: boolean
}>()

const query = ref('')

const filteredOptions = computed(() => {
  if (query.value === '') {
    return props.options
  }

  return props.options.filter((option) =>
    option.name.toLowerCase().includes(query.value.toLowerCase())
  )
})

const displayValue = (value: any) => {
  if (!value) return ''

  // اگر value یک id است (string/number)
  if (typeof value === 'string' || typeof value === 'number') {
    const option = props.options.find((opt) => opt.id === value)
    return option ? option.name : ''
  }

  // اگر value یک object است
  return value.name || ''
}

const handleSelection = (option: Option, handleChange: Function) => {
  // اگر returnId true باشه فقط id رو بفرست
  if (props.returnId) {
    handleChange(option.id)
  } else {
    // اگر نه کل object رو بفرست
    handleChange(option)
  }
  query.value = ''
}

const isSelected = (option: Option, fieldValue: any) => {
  if (!fieldValue) return false

  // اگر value یک id است
  if (typeof fieldValue === 'string' || typeof fieldValue === 'number') {
    return option.id === fieldValue
  }

  // اگر value یک object است
  return option.id === fieldValue.id
}
</script>

<template>
  <Field :name="name" v-slot="{ field, errors, handleChange }">
    <div class="mb-4">
      <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }} <span class="text-red-500">*</span>
      </label>

      <Combobox
        :model-value="field.value"
        @update:model-value="(option) => handleSelection(option, handleChange)"
        nullable
      >
        <div class="relative">
          <div
            class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all"
          >
            <ComboboxInput
              class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
              :display-value="displayValue"
              @change="query = $event.target.value"
              :placeholder="placeholder || 'Search...'"
            />
            <ComboboxButton
              class="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ComboboxOptions
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <div
                v-if="filteredOptions.length === 0 && query !== ''"
                class="relative cursor-default select-none py-2 px-4 text-gray-700"
              >
                Nothing found.
              </div>

              <ComboboxOption
                v-for="option in filteredOptions"
                :key="option.id"
                :value="option"
                as="template"
                v-slot="{ active }"
              >
                <li
                  :class="[
                    'relative cursor-pointer select-none py-2 pl-10 pr-4',
                    active ? 'bg-blue-600 text-white' : 'text-gray-900',
                  ]"
                >
                  <span
                    :class="[
                      'block truncate',
                      isSelected(option, field.value)
                        ? 'font-medium'
                        : 'font-normal',
                    ]"
                  >
                    {{ option.name }}
                  </span>
                  <span
                    v-if="isSelected(option, field.value)"
                    :class="[
                      'absolute inset-y-0 left-0 flex items-center pl-3',
                      active ? 'text-white' : 'text-blue-600',
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </transition>
        </div>
      </Combobox>

      <span v-if="errors[0]" class="text-red-500 text-sm mt-1 block">
        {{ errors[0] }}
      </span>
    </div>
  </Field>
</template>
