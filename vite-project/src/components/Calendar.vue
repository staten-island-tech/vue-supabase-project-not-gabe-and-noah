<template>
    <div class="holder">
      <div id="cal">
    <calBox></calBox>
    <p>test</p>
      </div>
    </div>
  </template>
  
  <style>
  
  #cal{
    background-color: green;
    height: 100%;
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
  