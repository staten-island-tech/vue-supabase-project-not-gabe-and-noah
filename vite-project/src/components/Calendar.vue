<template>
  <div class="holder">
    <popUpBox v-if="showBox" :date="selectedDate"></popUpBox>
    <div id="cal">      <p v-for="i in 4"></p>
      <p>{{ currentMonthName }} {{ currentYear }}</p>
      <div id="forward"@click="prevMonth">
        <img class="butt front" src="https://cdn.icon-icons.com/icons2/1674/PNG/512/arrowheadright_111038.png" >
      </div>
      <div id="backward" @click="nextMonth">
              <img class="butt back" src="https://cdn.icon-icons.com/icons2/1674/PNG/512/arrowheadright_111038.png"  >
            </div>

        <blankBox v-for="day in daysOfWeek" :day="day" :key="day"></blankBox>
        <calBox v-for="(date, index) in boxes"  :mon="currentMonth" :year="currentYear" :date="date" :key="index" :events="viewedArray" @popUp="(date) => popUp(date)"></calBox>
      </div>
      <div id="tasks">
       <div id="topBar"><p id="dale">Daily Tasks</p>
      </div>
      <div id="botBar"> <div v-for="i in viewedArray" v-if="i"><p>{{ i.time }}: {{ i.eventTitle }}</p></div></div>
      </div>
         </div>
</template>

<script setup lang="ts">
import calBox from '@/components/calBox.vue';
import blankBox from './blankBox.vue';
import { ref, computed, onMounted } from 'vue';
import { dateInfo } from "@/stores/date";
import popUpBox from "@/components/popUp.vue"
import { eventsPin } from '@/stores/events.ts';

const store = dateInfo();
const eventStore = eventsPin();
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
  // console.log(days)
  // for(let i = 0; i < 42 - days.length + 5; i++ ){
  //   days.push('')
  // }
  console.log(days)
  return days;
});

function popUp(date: [number, number, number]) {
  if (Array.isArray(date) && date.length === 3 && !isNaN(date[0]) && !isNaN(date[1]) && !isNaN(date[2])) {
    selectedDate.value = date;
    console.log(selectedDate.value)
    store.date.format = `${store.date.year}-${store.date.month.length == 1 ? store.date.month + 1 : 0 + (store.date.month + 1).toString()}-${selectedDate.value[1].length == 1 ? 0 + selectedDate.value[1] :  (selectedDate.value[1]).toString()}`
    console.log(store.date.format)
    showBox.value = true;
  } 
}

function nextMonth() {
  currentDate.value.setMonth(currentMonth.value + 1);
  currentDate.value = new Date(currentDate.value);
  if(store.date.month == 11){
    store.date.month = 0
    store.date.year++
  }
}

function prevMonth() {
  currentDate.value.setMonth(currentMonth.value - 1);
  currentDate.value = new Date(currentDate.value);
  if(store.date.month == 0){
    store.date.month = 11
    store.date.year--
  }
}


import { supabase } from "../lib/supabaseClient.ts";
import events from "@/components/events.vue";
import { info } from "@/stores/store"
import { useRouter } from 'vue-router'
import calendar from "@/components/Calendar.vue"
const router = useRouter()

interface Event {
  id: number;
  eventTitle: string;
  date: string;
  time: string;
  urgency: string;
}
const viewedArray = ref<Event[]>([]);

async function getUser() {
  try {
    const x = await supabase.auth.getUser();
    if (x.data && x.data.user) {
      const theThingy = await supabase
        .from('profiles')
        .select("*")
        .eq('id', x.data.user.id);
      if (theThingy.data && theThingy.data.length > 0) {
        const eventsIds = theThingy.data[0].events;
        const eventDataPromises = eventsIds.map(async (eventId: number) => {
          const { data: eventData, error } = await supabase
            .from('event')
            .select("*") 
            .eq('id', eventId);
          if (error) {
            console.error('not bazinga');
            return null;
          }
          if (eventData && eventData.length > 0) {
            return {
              id: eventData[0].id,
              eventTitle: eventData[0].eventName,
              date: eventData[0].dateDue,
              time: eventData[0].eventType,
              urgency: eventData[0].eventUrgency
            };
          }
          return null;
        });
        const eventDataArray = await Promise.all(eventDataPromises);
        viewedArray.value = eventDataArray.filter(eventData => eventData !== null);
        viewedArray.value.sort(compareFn);
        console.log('ea')
        eventStore.data.events = viewedArray
        console.log(eventStore.data.events)

      }
    }
  } catch (error) {
    console.error('not bazinga');
  }
}

onMounted(() => {
  getUser();
})


function compareFn(a: object, b: object) {
  // let test = a['date'].split("-", 3)
  if(a['date' as keyof Object].split("-", 3)[0] + a['date' as keyof Object].split("-", 3)[1] + a['date' as keyof Object].split("-", 3)[2] > b['date' as keyof Object].split("-", 3)[0] + b['date' as keyof Object].split("-", 3)[1] + b['date' as keyof Object].split("-", 3)[2]){
    return -1
  }
else{
  return 1
}
}
</script>


<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

html, body {
  height: 100%;
  overflow: hidden;
}

#dale{
  font-size: 1.25rem;
}

.front{
  transform:rotate(180deg)
}

.aaa{
  font-size: 1.75rem;
  overflow: hidden;
}

.butt{
  margin: auto;
  display: block;
}

.forward, .backward{
  display: flex;
  height: 100%;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#topBar{
  font-size: 2rem;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  height: 50px;
  outline: 2px solid black;
}

img{
  height: 50px;
  align-self: center;
  margin: 10px;
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
  background-color: lightgray;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows:(7, .05fr);
  height:calc(100vh - 100px);
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
  position: absolute;
  bottom: 0%;
  left: 0;
  overflow:auto;

  position: fixed;
    width: 85%;
    left: 0;
    
    z-index: 10;
}

#tasks {
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  width: calc(15% + 0px);
  height:calc(100vh - 101px);
  position: absolute;
  bottom: 0%;
  right: 0;
  outline: 2px solid black;
  overflow:auto;
  position: fixed;
    
    z-index: 10;
}


.holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0);
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