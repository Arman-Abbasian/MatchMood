<script setup lang="ts">
import {
  useGetUserDailyMemoriesCountQuery,
  useGetUserStatisticsQuery,
} from '@/api/user/user-queries'
import { computed, watchEffect } from 'vue'
import { Line } from 'vue-chartjs'

const { data: GetUserStatistics, isFetching: GetUserStatisticsLoading } =
  useGetUserStatisticsQuery()

const {
  data: getUserDailyMemoriesCount,
  isFetching: getUserDailyMemoriesCountLoading,
} = useGetUserDailyMemoriesCountQuery()

watchEffect(() => {
  console.log(getUserDailyMemoriesCount.value)
})

//----------
const labels = computed(
  () =>
    getUserDailyMemoriesCount?.value?.map(
      (item: { day: string; memory_count: number }) => item.day
    ) ?? []
)

const values = computed(
  () =>
    getUserDailyMemoriesCount?.value?.map(
      (item: { day: string; memory_count: number }) => item.memory_count
    ) ?? []
)
const data = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Daily Memories',
      data: values.value,
      borderWidth: 2,
      tension: 0.4,
    },
  ],
}))
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      type: 'linear',
      ticks: {
        stepSize: 1,
        precision: 0,
      },
      beginAtZero: true,
    },
  },
}
</script>

<template>
  <div class="flex items-center flex-wrap gap-4">
    <p>all Memories: {{ GetUserStatistics?.total }}</p>
    <p>happy Memories: {{ GetUserStatistics?.happy }}</p>
    <p>sad Memories: {{ GetUserStatistics?.sad }}</p>
    <p>public Memories: {{ GetUserStatistics?.public }}</p>
    <p>private Memories: {{ GetUserStatistics?.private }}</p>
  </div>
  <!-- chart section -->
  <div style="height: 300px">
    <Line :data="data || []" :options="options" />
  </div>
</template>
<style scoped></style>
