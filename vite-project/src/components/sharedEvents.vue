<template>
    <div class="event-display">
      <h2>Event Details</h2>
      <p><strong>Title:</strong> {{ eventTitle }}</p>
      <p><strong>Urgency:</strong> {{ urgency }}</p>
      <p><strong>Time:</strong> {{ time }}</p>
      <p><strong>Date:</strong> {{ date }}</p>
      <p><strong>Username:</strong> {{ username }}</p>
      <div class="buttons">
        <button @click="acceptEvent">Accept</button>
        <button @click="denyEvent">Deny</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  interface Props {
    eventTitle: string;
    urgency: string;
    time: string;
    date: string;
    username: string;
  }
  
  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'accept'): void;
    (e: 'deny'): void;
  }>();
  
  const acceptEvent = () => {
    emit('accept');
  };
  
  const denyEvent = () => {
    emit('deny');
  };
  </script>
  
  <style scoped>
  html, body{
    background-color:teal;
  }

  .event-display {
    background-color: #131515;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 30px;
  }
  
  .event-display h2 {
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
  
  .event-display p {
    margin: 10px 0;
    color: #ccc;
  }
  
  .event-display p strong {
    font-weight: bold;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  button:first-of-type {
    background-color: #28a745;
    color: white;
  }
  
  button:last-of-type {
    background-color: #dc3545;
    color: white;
  }
  </style>
  