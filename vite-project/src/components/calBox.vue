<template>
  <div @click="handleClick" :class="['box', { 'hoverable': isHoverable }]">
    <div class="infoBox" v-if="props.date" @click="handleClick">
      <div class="date">
    <p class="text">{{ props.date }}</p>
  </div>
  <div class="ev">
    <div class="wow" v-for="event in eventStore.data.events" :class="event['urgency']">
      <p v-if="event['date'] ==  `${props.year}-${props.mon.length == 1 ? props.mon + 1 : 0 + (props.mon + 1).toString()}-${props.date.length == 1 ? 0 + props.date : props.date}`">{{ event['eventTitle'] }}</p>
      <p v-if="event['date'] ==  `${store.date.year}-${store.date.month.length == 1 ? store.date.month + 1 : 0 + (store.date.month + 1).toString()}-${props.date}`">{{ event['time'] }}</p>
      <p v-if="event['date'] ==  `${store.date.year}-${store.date.month.length == 1 ? store.date.month + 1 : 0 + (store.date.month + 1).toString()}-${props.date}`">{{ event[''] }}</p>

   
   
    </div>
  

    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { defineProps, computed, toRefs, defineEmits } from 'vue';
import { dateInfo } from "@/stores/date";
import { eventsPin } from '@/stores/events';




const store = dateInfo();
const eventStore = eventsPin()
const props = defineProps<{
  date: number | string;
  events: string[];
  mon: number;
  year: number;
}>();



// console.log(eventStore.data.events[2].date)
console.log(props.mon + 1)
console.log(props.year)
console.log(props.date)
console.log(`${props.year}-${props.mon.length == 1 ? props.mon + 1 : 0 + (props.mon + 1).toString()}-${props.date.length == 1 ? 0 + props.date : props.date}`)

let eventList = []

const { date } = toRefs(props);

const emit = defineEmits<{
  (e: 'popUp', payload: [number, number, number]): void;
}>();

const isHoverable = computed(() => {
  const dateValue = typeof date.value === 'string' ? parseInt(date.value) : date.value;
  // console.log(dateValue);
  return dateValue > 0;
});

const handleClick = () => {
  store.date.popUp = true;
  console.log('ea')
  const dateValue = typeof props.date === 'string' ? parseInt(props.date) : props.date;
  if (!isNaN(dateValue)) {
    emit('popUp', [store.date.month, dateValue, store.date.year]);
  }
};



// eventStore.data.events.forEach(event => {
//   console.log(event)
//   if(event ==  `${store.date.year}-${ store.date.month.length == 1 ? store.date.month + 1 :  0 + String((store.date.month + 1))}-${ props.date.length > 1 ? parseInt(props.date) + 1 :  0 + String((parseInt(props.date) + 1)) }`){
//     eventList.push(event)
//   }
// })
</script>
  
  <style scoped>


.Medium{
  background-color: #CCCFBC;
}

.High{
  background-color: #997570
}

.Low{
  background-color: #96ae8d;
}


  .date{  
    /* position: relative; */
  height: 100%;
    width: 20%;
    border-bottom: 2px solid black;
  }

p{
  margin: 7px;
}

h3{
  font-size: 16px;
  color: black;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.wow{
  /* outline: 2px solid black; */
    /* background-color:ivory; */
    border-radius: 10px;
    max-height: 76px;
    overflow:auto;
  z-index: -1;
  /* border: 1px black solid; */
  margin: 10px;
}
  .infoBox{
    display: flex;
    padding: 0px;
    width: 100%;
    flex-direction: row;
    justify-content: right;
  }
  .box {
    background-color: white;
    border: 1px gray solid;
    color: blue;
    position: relative;
    display: flex;  
    justify-content: flex-start;
    align-items: flex-start;
height:100%;
    width: 1fr;
    box-sizing: border-box;
  }
  .example::-webkit-scrollbar {
  display: none;
}
  
  .ev{
    height: 124px;
    overflow: auto;
    -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  /* transform: translateY(-34.8px); */
  width: 80%

  }

  .text{
    height: 19.2px;
  }

  .hoverable:hover {
    transition: 0.75s;
    background-color: gold;
  }
  </style>