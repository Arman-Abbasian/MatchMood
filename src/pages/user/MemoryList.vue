<script setup lang="ts">
import MemoryList from '@/components/shared/MemoryList.vue'
import { useGetAllUserMemories } from '@/api/reminder/memory-queries'
</script>

<template>
  <MemoryList :useQueryFn="useGetAllUserMemories" />
</template>
