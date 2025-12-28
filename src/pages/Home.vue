<script setup lang="ts">
import MemoryList from '@/components/shared/MemoryList.vue'
import { useGetAllPublicMemories } from '@/api/reminder/memory-queries'
import { useGetUserDataQuery } from '@/api/user/user-queries'
import { useGetAllUserStatisticsQuery } from '@/api/global/global-queries'
import { watch } from 'vue'
import StatisticCard from '@/ui/StatisticCard.vue'
import { UserIcon } from '@heroicons/vue/24/outline'

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
    class="h-20 shadow-xl flex justify-between items-center py-2 px-4 mb-10 bg-primary-500 text-white"
    :class="{ 'blur-md': GetUserDataLoading }"
  >
    <p v-if="GetUserData">{{ `Hi ${GetUserData.name}` }}</p>
    <p v-else>Guest user</p>
    <router-link to="user" v-if="GetUserData"
      ><UserIcon class="w-7"
    /></router-link>
    <router-link to="auth/login" v-else>login</router-link>
  </header>
  <div class="px-4">
    <h1 class="match-mood-logo mb-10 text-center">Match Mood</h1>
    <div class="flex items-center flex-wrap gap-4">
      <StatisticCard
        title="All Memories"
        :value="GetAllUserStatistics?.total"
        containerClass="bg-info"
        :loading="GetAllUserStatisticsLoading"
      />
      <StatisticCard
        title="Happy Memories"
        :value="GetAllUserStatistics?.happy"
        containerClass="bg-success"
        :loading="GetAllUserStatisticsLoading"
      />
      <StatisticCard
        title="Sad Memories"
        :value="GetAllUserStatistics?.sad"
        containerClass="bg-error"
        :loading="GetAllUserStatisticsLoading"
      />
      <StatisticCard
        title="Public Memories"
        :value="GetAllUserStatistics?.public"
        containerClass="bg-text-muted"
        :loading="GetAllUserStatisticsLoading"
      />
      <StatisticCard
        title="Private Memories"
        :value="GetAllUserStatistics?.private"
        containerClass="bg-warning"
        :loading="GetAllUserStatisticsLoading"
      />
    </div>
    <div>
      <MemoryList :useQueryFn="useGetAllPublicMemories" />
    </div>
  </div>
</template>
<style scoped>
.match-mood-logo {
  font-size: 5rem;
  font-weight: bold;
  background: linear-gradient(
    to right,
    var(--color-primary-50),
    var(--color-primary-100),
    var(--color-primary-300),
    var(--color-primary-500)
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-animation 3s linear infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>
