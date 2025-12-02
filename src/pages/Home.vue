<script setup lang="ts">
import MemoryList from '@/components/shared/MemoryList.vue'
import { useGetAllPublicMemories } from '@/api/reminder/memory-queries'
import { useGetUserDataQuery } from '@/api/user/user-queries'
import { useGetAllUserStatisticsQuery } from '@/api/global/global-queries'
import { watch } from 'vue'

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
    class="h-20 shadow-xl flex justify-between items-center py-2 px-4 mb-10 bg-amber-200"
    :class="{ 'blur-md': GetUserDataLoading }"
  >
    <p v-if="GetUserData">{{ `Hi ${GetUserData.name}` }}</p>
    <p v-else>Guest user</p>
    <router-link to="user" v-if="GetUserData">panel</router-link>
    <router-link to="auth/login" v-else>login</router-link>
  </header>
  <div class="px-4">
    <div class="flex items-center flex-wrap gap-4">
      <p>all Memories: {{ GetAllUserStatistics?.total }}</p>
      <p>happy Memories: {{ GetAllUserStatistics?.happy }}</p>
      <p>sad Memories: {{ GetAllUserStatistics?.sad }}</p>
      <p>public Memories: {{ GetAllUserStatistics?.public }}</p>
      <p>private Memories: {{ GetAllUserStatistics?.private }}</p>
    </div>
    <div>
      <MemoryList :useQueryFn="useGetAllPublicMemories" />
    </div>
  </div>
</template>
<style scoped></style>
