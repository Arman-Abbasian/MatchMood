<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-12 h-full bg-red-200">
    <div class="col-span-3 bg-amber-200 overflow-auto">
      <ul class="flex flex-col gap-8">
        <li><router-link to="">statistics</router-link></li>
        <li><router-link to="profile">profile</router-link></li>
        <li><router-link to="addReminder">add reminder</router-link></li>
        <li><router-link to="reminderList">reminder list</router-link></li>
      </ul>
    </div>
    <div class="col-span-9 overflow-auto">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped></style>
