<script setup lang="ts">
import MemoryList from '@/components/shared/MemoryList.vue'
import { useGetAllPublicMemories } from '@/api/reminder/memory-queries'
import { useGetUserDataQuery } from '@/api/user/user-queries'
import { useGetAllUserStatisticsQuery } from '@/api/global/global-queries'
import { watch } from 'vue'
import StatisticCard from '@/ui/StatisticCard.vue'

const { data: GetUserData, isFetching: GetUserDataLoading } =
  useGetUserDataQuery()

const { data: GetAllUserStatistics, isFetching: GetAllUserStatisticsLoading } =
  useGetAllUserStatisticsQuery()

watch(
  () => GetAllUserStatistics.value,
  () => {
    console.log(GetAllUserStatistics.value)
  }
)
</script>

<template>
  <header
    class="h-20 shadow-xl flex justify-between items-center py-2 px-4 mb-10 bg-primary-500"
    :class="{ 'blur-md': GetUserDataLoading }"
  >
    <p v-if="GetUserData">{{ `Hi ${GetUserData.name}` }}</p>
    <p v-else>Guest user</p>
    <router-link to="user" v-if="GetUserData">panel</router-link>
    <router-link to="auth/login" v-else>login</router-link>
  </header>
  <div class="px-4">
    <div class="flex items-center flex-wrap gap-4">
      <StatisticCard
        title="All Memories"
        :value="GetAllUserStatistics?.total"
        containerClass="bg-info"
      />
      <StatisticCard
        title="Happy Memories"
        :value="GetAllUserStatistics?.happy"
        containerClass="bg-success"
      />
      <StatisticCard
        title="Sad Memories"
        :value="GetAllUserStatistics?.sad"
        containerClass="bg-error"
      />
      <StatisticCard
        title="Public Memories"
        :value="GetAllUserStatistics?.public"
        containerClass="bg-text-muted"
      />
      <StatisticCard
        title="Private Memories"
        :value="GetAllUserStatistics?.private"
        containerClass="bg-warning"
      />
    </div>
    <div>
      <MemoryList :useQueryFn="useGetAllPublicMemories" />
    </div>
  </div>
</template>
<style scoped></style>
