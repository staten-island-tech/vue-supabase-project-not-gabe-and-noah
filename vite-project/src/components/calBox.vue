<template>
    <div :class="['box', { 'clickable': isClickable }]" @click="openModal">
      <p>{{ props.date }}</p>
      <div v-for="event in events" :key="event.id" class="event">{{ event.text }}</div>
      <div v-if="modalOpen" class="modal" @click.stop>
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>Create Event</h2>
          <form @submit.prevent="handleCreateEvent">
            <div class="form-group">
              <label for="event">Event:</label>
              <input type="text" id="event" v-model="eventText" required @click.stop>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed, ref } from 'vue';
  
  const props = defineProps({
      date: [Number, String]
  });
  
  const isClickable = computed(() => {
      const date = parseInt(props.date);
      return (date > 0);
  });
  
  const modalOpen = ref(false);
  const eventText = ref('');
  const events = ref([]);
  
  function openModal() {
    modalOpen.value = true;
  }
  
  function closeModal() {
    modalOpen.value = false;
  }
  
  function handleCreateEvent() {
    const text = eventText.value.trim();
    if (text) {
      const date = props.date.toString();
      events.value.push({ id: Date.now(), text });
      eventText.value = '';
    }
    closeModal();
  }
  </script>
  
<style scoped>
  .box {
    background-color: azure;
    border: 2px black solid;
    color: blue;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .box p {
    margin: 5px;
  }
  
  .clickable:hover {
    transition: 0.75s;
    background-color: gold;
  }

.event{
    margin-bottom: 5px;
    white-space: pre-line;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
  
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%; /* Adjust width as needed */
    max-width: 400px; /* Set a maximum width for better visibility */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>