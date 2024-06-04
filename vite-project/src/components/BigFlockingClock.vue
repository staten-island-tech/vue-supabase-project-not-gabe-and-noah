<template>
    <div>
        <p>{{ currentTime }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');

const updateClock = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString('en-US', { timeZone: 'America/New_York' });
};

let intervalId: number | undefined;

onMounted(() => {
  updateClock();
  intervalId = setInterval(updateClock, 1000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
p {
  font-size: 2em;
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
  margin-top: 75px;
}
</style>