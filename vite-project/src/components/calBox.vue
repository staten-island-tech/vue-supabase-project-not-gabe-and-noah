<template>
    <div @click="showBox" :class="['box', { 'hoverable': isHoverable }]">
      <p>{{ props.date }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed } from 'vue';
  import { info } from "@/stores/store"
  import { dateInfo } from "@/stores/date"
const store = dateInfo(); 
function showBox(){
  console.log(store.date)
}

  const props = defineProps({
    date: [Number, String]
  });
  
  const isHoverable = computed(() => {
    const date = parseInt(props.date.month);
    console.log(date)
    return (date > 0);
  });

  </script>
  
  <style scoped>
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
  
  
  .hoverable:hover {
    transition: 0.75s;
    background-color: gold;
  }
  </style>