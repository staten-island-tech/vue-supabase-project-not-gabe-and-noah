<template>
    <div class="modal" v-if="store.date.popUp">
      <div class="modal-content">
        <span class="close" @click="store.date.popUp = false">&times;</span>
        <h2>Create Event For {{ `${props.date[0] + 1}/${props.date[1]}/${props.date[2]}` }}</h2>
        <form>
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
          <button type="submit" @click.prevent="test">Save</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  import { dateInfo } from "@/stores/date";
import { supabase } from '@/lib/supabaseClient';
  const store = dateInfo();
  
  const props = defineProps<{ date: [number, number, number] | null }>();
  
  let eventTitle = ref('');
  let urgency = ref('Low');
  let eventDate = ref('');
  let eventTime = ref('');

  async function test() {
 let newEvent = await supabase
  .from('event')
  .insert([
    { eventName: eventTitle.value, dateDue: urgency.value, eventType: eventDate.value, eventUrgency: eventTime.value, },
  ])
  let recentEvent = await supabase
  .from('event')
  .select("*")
  .eq('eventName', eventTitle.value)
  recentEvent = recentEvent.data[recentEvent.data.length-1].id
  const localUser = await supabase.auth.getUser();
  let user = await supabase
  .from('profiles')
  .select("*")
  .eq('id', localUser.data.user.id)
  console.log(user.data[0].events)
  if(user.data[0].events == null){
    let updatedArray = await supabase
  .from('profiles')
  .update({ events: [recentEvent] })
  .eq('id', localUser.data.user.id)
  .select() 
  } else{
    let newArray = [...user.data[0].events, recentEvent.toString()]
    console.log(user.data[0].events)
    console.log(recentEvent)
    console.log(newArray)
    let updatedArray = await supabase
  .from('profiles')
  .update({ events: newArray })
  .eq('id', localUser.data.user.id)}
  store.date.popUp = false;
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