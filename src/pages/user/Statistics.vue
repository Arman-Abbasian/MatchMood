<script setup lang="ts">
import {
  useGetUserDailyMemoriesCountQuery,
  useGetUserStatisticsQuery,
} from '@/api/user/user-queries'
import StatisticCard from '@/ui/StatisticCard.vue'
import type { ChartOptions } from 'chart.js'
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

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'category' as const,
    },
    y: {
      type: 'linear' as const,
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        precision: 0,
      },
    },
  },
}
</script>

<template>
  <div class="flex items-center flex-wrap gap-4">
    <StatisticCard
      title="All Memories"
      :value="GetUserStatistics?.total"
      containerClass="bg-info"
    />
    <StatisticCard
      title="Happy Memories"
      :value="GetUserStatistics?.happy"
      containerClass="bg-success"
    />
    <StatisticCard
      title="Sad Memories"
      :value="GetUserStatistics?.sad"
      containerClass="bg-error"
    />
    <StatisticCard
      title="Public Memories"
      :value="GetUserStatistics?.public"
      containerClass="bg-text-muted"
    />
    <StatisticCard
      title="Private Memories"
      :value="GetUserStatistics?.private"
      containerClass="bg-warning"
    />
  </div>
  <!-- chart section -->
  <div style="height: 300px">
    <Line :data="data || []" :options="options" />
  </div>
</template>
<style scoped></style>
