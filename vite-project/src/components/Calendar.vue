<template>
  <div class="holder">
    <div class="controls">
      <div id="buttons">
      
      
    </div>
      <h1>{{ currentMonthName }} {{ currentYear }}</h1>
    </div>
    <div id="calCon">
      <img class="calButt" id="calLeft" @click="prevMonth" src="https://icon-library.com/images/camping-icon-png/camping-icon-png-23.jpg">
        <div id="cal">
      <blankBox v-for="day in daysOfWeek" :day="day" :key="day"></blankBox>
      <calBox v-for="(date, index) in boxes" :date="date" :key="index"></calBox>
    </div>
    <img class="calButt" id="calRight" @click="nextMonth" src="https://icon-library.com/images/camping-icon-png/camping-icon-png-23.jpg">
    </div>
  </div>
</template>

<script setup lang="ts">
import calBox from '@/components/calBox.vue'
import blankBox from './blankBox.vue';
import { ref, computed } from 'vue';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDate = ref(new Date());

const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentMonthName = computed(() => currentDate.value.toLocaleString('default', { month: 'long' }));

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDay = computed (() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const boxes = computed(() => {
  const days = []
  for (let i = 1; i <= firstDay.value; i++) {
    days.push('');
  }
  for (let i = 1; i <= daysInMonth.value; i++) {
    days.push(i.toString());
  }
  return days;
});

console.log(boxes)
function nextMonth() {
  currentDate.value.setMonth(currentMonth.value + 1);
  currentDate.value = new Date(currentDate.value);
}

function prevMonth() {
  currentDate.value.setMonth(currentMonth.value - 1);
  currentDate.value = new Date(currentDate.value);
}
</script>

<style>

#calCon{
  width: 100%;
  background-color: rgba(0,0,0,1);
  display: flex
}

#calRight{
  transform: rotate(90deg)
}

#calLeft{
  transform: rotate(270deg)
}
.calButt{
  align-self: center;
  filter: invert(1);
  width: 10%;
  height: 10%;
  transition: .5s;
}

.calButt:hover{
  filter: invert(50%);
}

#cal {
  background-color: black;
  height: auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: .5fr repeat(6, 1fr);
  width: calc(80% - 20px);
  height: 700px;
  padding: 10px;
  padding-top: 0px;
  max-height: 100%;
  overflow: auto;
  column-gap: 0px;
  row-gap: 0px;
}

.holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  background-color: goldenrod;
  overflow: auto;
  max-height: 100%;
}

.controls {
  padding: 1%;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  width: 70%;
  justify-content: center;
  align-items: center;
}

button {
  padding: 10px 20px;
  background-color: azure;
  border: 2px solid black;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: gold;
}

p {
  font-size: 1.2em;
  font-family: 'Montserrat', sans-serif;
}

h1 {
  font-size: 2em;
  font-family: 'Montserrat', sans-serif;
}

</style>