<template>
    <div class="holder">
      <div id="cal">
    <calBox v-for="i in 31"></calBox>
      </div>
    </div>
  </template>
  
  <style>
  
  #cal{
    background-color: orangered;
    height: 30%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 100%;
  }
    .holder {
      min-height: 100%;
      width: 100%;
      opacity: 1;
      display: flex;
      align-items: center;
      background-color: goldenrod;
    }

  </style>
  
  <script setup lang="ts">
import calBox from '@/components/calBox.vue'

</script>
  