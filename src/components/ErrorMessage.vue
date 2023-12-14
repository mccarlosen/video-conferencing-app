<script setup lang="ts">
import { useMeetingStore } from '@/stores/meeting';
const meetingStore = useMeetingStore()
</script>

<template>
  <template v-if="meetingStore.errorFormMessage">
    <div class="rounded p-3 bg-red-500 text-white"><strong>Error:</strong> {{ meetingStore.errorFormMessage }}</div>
  </template>
</template>