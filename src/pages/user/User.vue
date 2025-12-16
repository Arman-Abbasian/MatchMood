<script setup lang="ts">
import {
  ArrowLongLeftIcon,
  ChartBarSquareIcon,
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="grid grid-cols-12 h-full bg-red-200 text-white">
    <div class="col-span-2 bg-primary-500 overflow-auto">
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
          <div class="flex items-center gap-2">
            <arrow-long-left-icon class="w-6" />
            <p>Logout</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-span-10 overflow-auto bg-primary-50">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped></style>
