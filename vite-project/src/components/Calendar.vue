<template>
  <div class="holder">
    <div id="cal">
      <blankBox v-for="day in daysOfWeek" :day="day" :key="day"></blankBox>
      <calBox v-for="(date, index) in boxes" :date="date" :key="index" @click="openModal(date)"></calBox>
    </div>
    <div class="controls">
      <button @click="prevMonth">Previous</button>
      <button @click="nextMonth">Next</button>
      <p>{{ currentMonthName }} {{ currentYear }}</p>
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

const firstDay = computed(() => {
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
#cal {
  background-color: black;
  height: auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: .5fr repeat(5, 1fr);
  width: 100%;
}

.holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  background-color: goldenrod;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
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

</style>