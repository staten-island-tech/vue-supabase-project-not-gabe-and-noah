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
                      <label for="event">Event Title:</label>
                      <input type="text" id="event" v-model="eventText" required @click.stop>
                  </div>
                  <div class="form-group">
                      <label for="urgency">Urgency:</label>
                      <select id="urgency" v-model="urgency">
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                      </select>
                  </div>
                  <div class="form-group">
                      <label for="date">Date:</label>
                      <input type="date" id="date" v-model="date" required>
                  </div>
                  <div class="form-group">
                      <label for="time">Time:</label>
                      <input type="time" id="time" v-model="time" required>
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
const urgency = ref('Low');
const event = ref('');
const date = ref('');
const time = ref('');
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
        const newEvent = {
            id: Date.now(),
            text,
            urgency: urgency.value,
            event: event.value,
            date: date.value,
            time: time.value
        };
        console.log(urgency.value, event.value, date.value, time.value)
        events.value.push(newEvent);
        eventText.value = '';
        urgency.value = 'Low';
        event.value = '';
        date.value = '';
        time.value = '';
    }
    closeModal();
}
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
  

  .box {
      background-color: azure;
      border: 1px gray solid;
      color: blue;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
  }

  .clickable:hover {
      transition: 0.75s;
      background-color: gold;
  }

  .event {
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
    font-family: 'Montserrat', sans-serif;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Adjust width as needed */
    max-width: 400px; /* Set a maximum width for better visibility */
    border-radius: 8px; /* Add border radius for a rounded look */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="date"],
  input[type="time"],
  select {
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
    margin-top: 5px;
  }

  button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  button[type="submit"]:hover {
    background-color: #45a049;
  }
</style>