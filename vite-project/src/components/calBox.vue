<template>
    <div @click="$emit('popUp', [store.date.month, parseInt(props.date), store.date.year ])" :class="['box', { 'hoverable': isHoverable }]">
      <p>{{ props.date }}</p>
    </div>
  </template>

  
  <script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { info } from "@/stores/store"
  import { dateInfo } from "@/stores/date"
const store = dateInfo(); 


  const props = defineProps({
    date: [Number, String]
  });
  
  const isHoverable = computed(() => {
    const date = parseInt(props.date);
    console.log(date)
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
  
  button[type="submit"]:hover {
    background-color: #45a049;
  }
</style>

