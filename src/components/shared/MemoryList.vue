<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  useQueryFn: () => any
}>()

const { data, isLoading } = props.useQueryFn()
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>

    <div v-else class="flex items-center flex-wrap gap-2">
      <div
        v-for="item in data"
        :key="item.id"
        class="w-44 h-44 border rounded-md shadow-2xl p-2"
      >
        <p>{{ item.user.name }}</p>
        <p>{{ item.sport.name }}</p>
        <p>{{ dayjs(item.date).format('YYYY/MM/DD') }}</p>
        <p>{{ dayjs(item.date).format('HH:mm') }}</p>
        <p>{{ item.mood === 0 ? 'happy' : 'sad' }}</p>
      </div>
    </div>
  </div>
</template>
