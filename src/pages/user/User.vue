<script setup lang="ts">
import { useLogoutMutation } from '@/api/auth/auth-queries'
import {
  ArrowLongLeftIcon,
  ChartBarSquareIcon,
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()
const LogoutMutation = useLogoutMutation()

const logoutHanlder = async () => {
  debugger
  await LogoutMutation.mutateAsync()
  router.push('/auth/login')
}
</script>

<template>
  <div class="h-screen grid grid-cols-12 bg-red-200 text-white">
    <div
      class="hidden md:block md:col-span-2 bg-primary-500 overflow-auto h-full"
    >
      <ul class="flex flex-col gap-8 pl-3 py-4">
        <li>
          <router-link to=""
            ><div class="flex items-center gap-2">
              <chart-bar-square-icon class="w-6" />
              <p>statistics</p>
            </div></router-link
          >
        </li>
        <li>
          <router-link to="profile"
            ><div class="flex items-center gap-2">
              <user-icon class="w-6" />
              <p>profile</p>
            </div></router-link
          >
        </li>
        <li>
          <router-link to="addMemory"
            ><div class="flex items-center gap-2">
              <plus-icon class="w-6" />
              <p>add memory</p>
            </div></router-link
          >
        </li>
        <li>
          <router-link to="MemoryList"
            ><div class="flex items-center gap-2">
              <list-bullet-icon class="w-6" />
              <p>memory list</p>
            </div></router-link
          >
        </li>
        <li>
          <router-link to="/"
            ><div class="flex items-center gap-2">
              <home-icon class="w-6" />
              <p>Home</p>
            </div></router-link
          >
        </li>
        <li>
          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="logoutHanlder"
          >
            <arrow-long-left-icon class="w-6" />
            <p>Logout</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-span-12 md:col-span-10 overflow-auto bg-primary-50">
      <div
        class="md:hidden flex items-center p-4 sticky top-0 h-20 bg-primary-500 w-full"
      >
        <button class="text-white">☰</button>
      </div>
      <div class="flex flex-col justify-center bg-primary-50 mt-2 md:p-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
