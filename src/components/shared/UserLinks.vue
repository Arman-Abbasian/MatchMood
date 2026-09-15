<script setup lang="ts">
import { useLogoutMutation } from '@/api/auth/auth-queries'
import { useRouter } from 'vue-router'
import {
  ArrowLongLeftIcon,
  ChartBarSquareIcon,
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const LogoutMutation = useLogoutMutation()

const logoutHandler = async () => {
  await LogoutMutation.mutateAsync()
  router.push('/auth/login')
}
</script>

<template>
  <ul class="flex flex-col gap-8">
    <li>
      <router-link to="/user"
        ><div class="flex items-center gap-2">
          <chart-bar-square-icon class="w-6" />
          <p>statistics</p>
        </div></router-link
      >
    </li>
    <li>
      <router-link to="/user/profile"
        ><div class="flex items-center gap-2">
          <user-icon class="w-6" />
          <p>profile</p>
        </div></router-link
      >
    </li>
    <li>
      <router-link to="/user/addMemory"
        ><div class="flex items-center gap-2">
          <plus-icon class="w-6" />
          <p>add memory</p>
        </div></router-link
      >
    </li>
    <li>
      <router-link to="/user/MemoryList"
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
        @click="logoutHandler"
      >
        <arrow-long-left-icon class="w-6" />
        <p>Logout</p>
      </div>
    </li>
  </ul>
</template>
