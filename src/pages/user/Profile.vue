<script setup lang="ts">
import { useGetUserDataQuery, useGetUserQuery } from '@/api/user/user-queries'
import Spinner from '@/components/common/Spinner.vue'
import {
  CalendarDateRangeIcon,
  UserIcon,
  EnvelopeIcon,
} from '@heroicons/vue/24/outline'
import dayjs from 'dayjs'

const { data: GetUserData, isFetching: GetUserDataLoading } =
  useGetUserDataQuery()
const { data: GetUser, isFetching: GetUserLoading } = useGetUserQuery()
</script>

<template>
  <div class="flex flex-col gap-8 text-text-main">
    <div class="flex items-center gap-1">
      <user-icon class="w-6 text-text-main" />
      <p>name:</p>
      <span v-if="GetUserDataLoading"><spinner class="bg-primary-500" /></span>
      <p v-else class="text-primary-500">{{ GetUserData?.name }}</p>
    </div>
    <div class="flex items-center gap-1">
      <envelope-icon class="w-6 text-text-main" />
      <p>email:</p>
      <span v-if="GetUserLoading"><spinner class="bg-primary-500" /></span>
      <p v-else class="text-primary-500">{{ GetUser?.user?.email }}</p>
    </div>
    <div class="flex items-center gap-1">
      <calendar-date-range-icon class="w-6 text-text-main" />
      <p>account created at:</p>
      <span v-if="GetUserLoading"><spinner class="bg-primary-500" /></span>
      <p v-else class="text-primary-500">
        {{ dayjs(GetUser?.user?.created_at).format('YYYY/MM/DD HH:mm') }}
      </p>
    </div>
    <div class="flex items-center gap-1">
      <calendar-date-range-icon class="w-6 text-text-main" />
      <p>last update your account at:</p>
      <span v-if="GetUserLoading"><spinner class="bg-primary-500" /></span>
      <p v-else class="text-primary-500">
        {{ dayjs(GetUser?.user?.updated_at).format('YYYY/MM/DD HH:mm') }}
      </p>
    </div>
  </div>
</template>
<style scoped></style>
