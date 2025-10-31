<script setup lang="ts">
import { ref } from 'vue'
import rocket from '../assets/images/rocket.png'
const data = [
  { id: 1, name: 'ali', age: 20 },
  { id: 2, name: 'jalil', age: 41 },
  { id: 3, name: 'mahmood', age: 15 },
]

const name = ref('sina')
const showMeHandler = (a: string) => {
  alert(a)
}
</script>

<template>
  <div>
    <img :src="rocket" class="w-20 h-20" />
    <p>{{ name }}</p>
    <div v-for="item in data" :key="item.id" class="flex items-center gap-2">
      <p>{{ item.name }}</p>
      <p>has</p>
      <p>{{ item.age }} year old</p>
      <p>{{ item.name }} is {{ item.age > 20 ? 'old' : 'young' }}</p>
      <p v-if="item.age > 20">{{ item.name }} is old</p>
      <p v-else>{{ item.name }} is young</p>
    </div>
    <button @click="showMeHandler('ddd')">show me</button>
  </div>
</template>
<style scoped></style>
