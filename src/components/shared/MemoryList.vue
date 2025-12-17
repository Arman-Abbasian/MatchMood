<script setup lang="ts">
import dayjs from 'dayjs'
import happyIcon from '@/assets/images/happyIcon.png'
import sadIcon from '@/assets/images/sadIcon.png'

const props = defineProps<{
  useQueryFn: () => any
}>()

const { data, isLoading } = props.useQueryFn()
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>

    <div v-else class="flex items-center flex-wrap gap-10">
      <div
        v-for="item in data"
        :key="item.id"
        class="w-52 h-56 flex flex-col gap-4 rounded-md shadow-2xl p-4 bg-primary-300 relative text-white"
      >
        <p>name: {{ item.user.name }}</p>
        <p>sport: {{ item.sport.name }}</p>
        <p>date: {{ dayjs(item.date).format('YYYY/MM/DD') }}</p>
        <p>time: {{ dayjs(item.date).format('HH:mm') }}</p>
        <p>mood: {{ item.mood === 0 ? 'happy' : 'sad' }}</p>
        <img
          v-if="item.mood === 0"
          :src="happyIcon"
          class="w-10 h-10 absolute -top-4 -right-4"
        />
        <img
          v-else
          :src="sadIcon"
          class="w-[52px] h-[52px] absolute -top-4 -right-4"
        />
      </div>
    </div>
  </div>
</template>
