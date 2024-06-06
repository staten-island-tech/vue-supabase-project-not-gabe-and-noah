<template>
    <div :class="['box', { 'hoverable': isHoverable }]">
      <p>{{ props.date }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    date: [Number, String]
  });
  
  const isHoverable = computed(() => {
    const date = parseInt(props.date);
    return (date > 0);
  });

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
  
  .hoverable:hover {
    transition: 0.75s;
    background-color: gold;
  }
  </style>