<template>
    <div class="holder">
      <div id="cal">
        <blankBox v-for="i in ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']" :day="i"></blankBox>
    <calBox v-for="i in daysInMonth + spares" :date="i - spares"></calBox>
      </div>
    </div>
  </template>
  
  <style>
  
  #cal{
    background-color: black;
    height: 600px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: .5fr repeat(5, 1fr);
    width: 100%;
  }
    .holder {
    display: flex;
    align-items: end;
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
import blankBox from './blankBox.vue';
let spares = 6
let daysInMonth = 30
</script>
  