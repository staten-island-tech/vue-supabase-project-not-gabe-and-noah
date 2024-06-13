<template>
  <div class="holder">
    <div id="cal">
      <h1>{{ currentMonthName }} {{ currentYear }}</h1>
      <p v-for="i in 6"></p>
        <blankBox v-for="day in daysOfWeek" :day="day" :key="day"></blankBox>
        <calBox v-for="(date, index) in boxes" :date="date" :key="index" @popUp="(date) => popUp(date)"></calBox>
      </div>
         </div>
</template>

<script setup lang="ts">
import calBox from '@/components/calBox.vue';
import blankBox from './blankBox.vue';
import { ref, computed } from 'vue';
import { dateInfo } from "@/stores/date";
import popUpBox from "@/components/popUp.vue";

const store = dateInfo();
const showBox = ref(false);
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDate = ref(new Date());
const selectedDate = ref<[number, number, number] | null>(null); 
const currentYear = computed(() => currentDate.value.getFullYear());
store.date.year = currentYear.value;

const currentMonth = computed(() => currentDate.value.getMonth());
store.date.month = currentMonth.value;

const currentMonthName = computed(() => currentDate.value.toLocaleString('default', { month: 'long' }));

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDay = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const boxes = computed(() => {
  const days: string[] = [];
  for (let i = 1; i <= firstDay.value; i++) {
    days.push('');
  }
  for (let i = 1; i <= daysInMonth.value; i++) {
    days.push(i.toString());
  }
  return days;
});

function popUp(date: [number, number, number]) {
  if (Array.isArray(date) && date.length === 3 && !isNaN(date[0]) && !isNaN(date[1]) && !isNaN(date[2])) {
    selectedDate.value = date;
    showBox.value = true;
  }
}

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

html, body {
  height: 100%;
  overflow: hidden;
}

#calCon {
  width: 100%;
  height:100%;
  background-color: #339989;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

#calRight, #calLeft {
  transform: rotate(90deg);
  width: 5%;
  height: 5%;
  filter: invert(1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

#calLeft {
  transform: rotate(270deg);
}

.calButt:hover {
  filter: invert(50%);
}

#cal {
  background-color: #fffafb;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 0.5fr  0.5fr repeat(6, 1fr);
  width: 80vw;
  height:80vh;
  padding: 10px;
  border-radius: 10px; 
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  bottom: 0%;
  left: 0;
}

.holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #131515;
  margin: 0;
  overflow: hidden;
}

.controls {
  padding: 1%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin-bottom: 20px;
  color: #fffafb;
}

button {
  border-radius: 20px;
  border: 1px solid #339989;
  background-color: #339989;
  color: #fffafb;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #fffafb;
}

p, h1 {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}

p {
  color: #131515;
}

h1 {
  margin-top: 1px;
  font-size: 2em;
  margin-bottom: 5px;
}

.calButt {
  transition: transform 0.3s ease;
}

.calButt:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  #calCon {
    flex-direction: column;
  }

  #calRight, #calLeft {
    width: 10%;
    height: 10%;
  }

  #cal {
    width: 100%;
    padding: 5px;
  }

  .controls {
    width: 90%;
  }
}
</style>