<template>
    <div class="modal" v-if="store.date.popUp">
          <div class="modal-content">
              <span class="close" @click="store.date.popUp = false">&times;</span>
              <h2>Create Event For {{`${props.date[0] + 1}/${props.date[1]}/${props.date[2]}`}}</h2>
              <form @submit.prevent="submitForm">
                <div class="form-group">
                      <label for="event">Event Title:</label>
                      <input type="text" id="event">
                  </div>
                  <div class="form-group">
                      <label for="urgency">Urgency:</label>
                      <select id="urgency">
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                      </select>
                  </div>
                  <div class="form-group">
                      <label for="date">Date:</label>
                      <input type="date" id="date">
                  </div>
                  <div class="form-group">
                      <label for="time">Time:</label>
                      <input type="time" id="time">
                  </div>
                  <button type="submit" @click="store.date.popUp = false">Save</button>
              </form>
          </div>
      </div>
</template>

<script setup lang="ts">
  import { dateInfo } from   "@/stores/date"
  const store = dateInfo(); 

 const props = defineProps({
    date: String,
  });
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
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Adjust width as needed */
    max-width: 400px; /* Set a maximum width for better visibility */
    border-radius: 8px; /* Add border radius for a rounded look */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
    position: relative; /* Add position relative for close button positioning */
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

  /* Style the form elements */
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