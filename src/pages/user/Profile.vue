<script setup lang="ts">
import { useGetUserDataQuery, useGetUserQuery } from '@/api/user/user-queries'
import dayjs from 'dayjs'
import { watchEffect } from 'vue'

const { data: GetUserData, isFetching: GetUserDataLoading } =
  useGetUserDataQuery()
const { data: GetUser, isFetching: GetUserLoading } = useGetUserQuery()
watchEffect(() => {
  console.log('User:', GetUser.value)
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <p>name: {{ GetUserData?.name }}</p>
    <p>email: {{ GetUser?.user?.email }}</p>
    <p>
      create your account at:
      {{ dayjs(GetUser?.user?.created_at).format('YYYY/MM/DD HH:mm') }}
    </p>
    <p>
      last update your account at:
      {{ dayjs(GetUser?.user?.updated_at).format('YYYY/MM/DD HH:mm') }}
    </p>
  </div>
</template>
<style scoped></style>
