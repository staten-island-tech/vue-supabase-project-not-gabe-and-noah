<template>
    <div class="event-display">
      <h2>Event Details</h2>
      <p><strong>Title:</strong> {{ eventTitle }}</p>
      <p><strong>Urgency:</strong> {{ urgency }}</p>
      <p><strong>Time:</strong> {{ time }}</p>
      <p><strong>Date:</strong> {{ date }}</p>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';
  
  interface Props {
    eventTitle: string;
    urgency: string;
    time: string;
    date: string;
  }
  
  const props = defineProps<Props>();
</script>
  
<style scoped>

.event-display {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
.event-display h2 {
    text-align: center;
    font-family: 'Montserrat', sans-serif;
}

.event-display p {
  margin: 10px 0;
}

.event-display p strong {
  font-weight: bold;
}

</style>