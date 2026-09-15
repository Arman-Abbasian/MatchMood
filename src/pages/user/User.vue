<script setup lang="ts">
import UserLinks from '@/components/shared/UserLinks.vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

let isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="h-screen grid grid-cols-12 bg-red-200 text-white">
    <div
      class="hidden md:block md:col-span-2 bg-primary-500 overflow-auto h-full"
    >
      <div class="pl-3 py-4"><user-links /></div>
    </div>
    <div class="col-span-12 md:col-span-10 overflow-auto bg-primary-50">
      <div
        class="md:hidden sticky top-0 h-16 bg-primary-500 w-full"
        :class="isOpen && 'h-screen'"
      >
        <button class="text-white flex p-4" @click="toggleMenu" v-if="isOpen">
          <x-mark-icon class="w-10" />
        </button>
        <button class="text-white flex p-4" @click="toggleMenu" v-else>
          <bars3-icon class="w-10" />
        </button>
        <div v-if="isOpen" class="pt-4 pl-6"><user-links /></div>
      </div>
      <div class="flex flex-col justify-center bg-primary-50 mt-2 md:p-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
