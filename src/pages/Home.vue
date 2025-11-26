<script setup lang="ts">
import MemoryList from '@/components/shared/MemoryList.vue'
import { useGetAllPublicMemories } from '@/api/reminder/memory-queries'
import { useGetUserDataQuery } from '@/api/user/user-queries'

const { data: GetUserData, isFetching: GetUserDataLoading } =
  useGetUserDataQuery()

console.log(GetUserData.value)
console.log(GetUserDataLoading.value)
</script>

<template>
  <div
    class="h-20 shadow-xl flex justify-between items-center py-2 px-4 mb-10 bg-amber-200"
    :class="{ 'blur-md': GetUserDataLoading }"
  >
    <p v-if="GetUserData">{{ `Hi ${GetUserData.name}` }}</p>
    <p v-else>Guest user</p>
    <router-link to="user" v-if="GetUserData">panel</router-link>
    <router-link to="auth/login" v-else>login</router-link>
  </div>
  <div class="px-4">
    <MemoryList :useQueryFn="useGetAllPublicMemories" />
  </div>
</template>
<style scoped></style>
