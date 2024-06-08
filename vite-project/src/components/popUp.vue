<template>
  <div class="modal" v-if="store.date.popUp && props.date">
    <div class="modal-content">
      <span class="close" @click="store.date.popUp = false">&times;</span>
      <h2 v-if="props.date">Create Event For {{ props.date[0] + 1 }}/{{ props.date[1] }}/{{ props.date[2] }}</h2>
      <form @submit.prevent="submitForm" v-if="props.date">
        <div class="form-group">
          <label for="event">Event Title:</label>
          <input type="text" id="event" v-model="eventTitle" required>
        </div>
        <div class="form-group">
          <label for="urgency">Urgency:</label>
          <select id="urgency" v-model="urgency" required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="eventDate" required>
        </div>
        <div class="form-group">
          <label for="time">Time:</label>
          <input type="time" id="time" v-model="eventTime" required>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { dateInfo } from "@/stores/date";
const store = dateInfo();

const props = defineProps<{ 
  date: [number, number, number] | null 
}>();

const eventTitle = ref('');
const urgency = ref('Low');
const eventDate = ref('');
const eventTime = ref('');

function submitForm() {
  if (props.date) {
    const eventDateArray = eventDate.value.split('-');
    const year = parseInt(eventDateArray[0], 10);
    const month = parseInt(eventDateArray[1], 10) - 1;
    const day = parseInt(eventDateArray[2], 10);

    const eventObject = {
      title: eventTitle.value,
      urgency: urgency.value,
      date: new Date(year, month, day),
      time: eventTime.value,
    };
  
    console.log(eventObject);
    store.date.popUp = false;
    eventTitle.value = ''
    urgency.value = ''
    eventDate.value = ''
    eventTime.value = ''
  }
}
</script>

<style scoped>
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
    font-family: 'Montserrat', sans-serif;
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    border-radius: 8px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    position: relative;
  }

  .close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    top: 10px;
    right: 10px;
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
    font-family: 'Montserrat', sans-serif;
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