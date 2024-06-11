<template>
  <div>
      <p>{{ currentTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');

function updateClock() {
const now = new Date();
currentTime.value = now.toLocaleString('en-US', { timeZone: 'America/New_York' });
};

let intervalId: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
updateClock();
intervalId = setInterval(updateClock, 1000);
});

onUnmounted(() => {
if (intervalId !== undefined) {
  clearInterval(intervalId);
}
});
</script>

