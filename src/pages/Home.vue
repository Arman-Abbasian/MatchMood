<script setup lang="ts">
import { reactive, ref } from 'vue'
import rocket from '../assets/images/rocket.png'

const abilityOptions = [
  { id: 1, name: 'react' },
  { id: 2, name: 'vue' },
  { id: 3, name: 'next' },
  { id: 4, name: 'nuxt' },
]
const cityOptions = [
  { id: 1, name: 'semnan' },
  { id: 2, name: 'ahar' },
  { id: 3, name: 'tehran' },
  { id: 4, name: 'karaj' },
]
interface FormInterface {
  name: string
  description: string
  abilities: string[]
  gender: '0' | '1'
  city: string
}
const data = [
  { id: 1, name: 'ali', age: 20 },
  { id: 2, name: 'jalil', age: 41 },
  { id: 3, name: 'mahmood', age: 15 },
]

const formData = reactive<FormInterface>({
  name: '',
  description: '',
  abilities: [],
  gender: '0',
  city: cityOptions[0]?.id.toString() ?? '1',
})
console.log(formData)
const name = ref('sina')
const showMeHandler = (a: string) => {
  alert(a)
}
</script>

<template>
  <!-- <div>
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
  </div> -->
  <div>
    <p>form section</p>
    <input v-model="formData.name" placeholder="name..." class="border" />
    <textarea
      v-model="formData.description"
      placeholder="description"
      class="border"
    ></textarea>
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-2" v-for="item in abilityOptions">
        <input
          type="checkbox"
          :value="item.id"
          v-model="formData.abilities"
          :id="item.name"
        />
        <label :for="`ability-${item.id}`">{{ item.name }}</label>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <input type="radio" id="man" value="0" v-model="formData.gender" />
      <label for="man">man</label>
      <input type="radio" value="1" v-model="formData.gender" />
      <label for="woman">woman</label>
    </div>
    <select v-model="formData.city" class="border">
      <option v-for="item in cityOptions" :value="item.id">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
<style scoped></style>
