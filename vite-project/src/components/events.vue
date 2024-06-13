<template>
  <div class="event-display" v-if="show">
    <h2>{{ eventTitle }}</h2>
    <p><strong>Urgency:</strong> {{ urgency }}</p>
    <p><strong>Time:</strong> {{ time }}</p>
    <p><strong>Date:</strong> {{ date }}</p>
    <button @click="deleteMe">Delete Task</button>
    <div class="buttons">
      <!-- <button @click="openUsernamePopup">Share</button> -->
    </div>
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <span class="close-btn" @click="closePopup()"></span>
        <h3>Enter Username</h3>
        <input type="text" v-model="username" placeholder="Enter username">
<!--         <button @click="shareEvent">Share</button>
 -->      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';
let show = ref(true)
const props = defineProps({
  eventTitle: String,
  urgency: String,
  time: String,
  date: String,
  id: Number,
})  
console.log(props)

async function deleteMe(){
  const response = await supabase
  .from('event')
  .delete()
  .eq('id', props.id)
  show.value = false
}

const showPopup = ref(false);
const username = ref('');

function openUsernamePopup() {
  showPopup.value = true;
}

function closePopup(id: number | undefined) {
  showPopup.value = false;
}

async function shareEvent() {
    const { data, error } = await supabase
  .from('profiles')
  .update({ sharedEvents: ['1','2'] })
  .eq('username', username.value)
  username.value = '';
  showPopup.value = false;
}
</script>

<style scoped>
.event-display {
  width: 10%;
  max-width: 10%;
  max-height:100%;
overflow: auto;
  padding: 50px;
  margin: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  background-image: linear-gradient(45deg, rgba(255,255,255,0.9), rgba(152,165,192,0.9));
  border-radius: 5px;
}

.event-display h2 {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

.event-display p {
  margin: 10px 0;
  color: black;
}

.event-display p strong {
  font-weight: bold;
}


.buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #131515;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  max-width: 300px;
  font-family: 'Montserrat', sans-serif;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}

.close-btn:hover {
  color: red;
}

.popup-content h3 {
  margin-top: 0;
}

.popup-content input[type="text"],
.popup-content button {
  margin: 5px;
  margin-top: 10px;
}

.popup-content input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.popup-content button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


.popup-content button:hover {
  background-color: #0056b3;
}
</style>

