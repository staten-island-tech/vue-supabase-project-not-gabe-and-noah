<template>
  <div @click="handleClick" :class="['box', { 'hoverable': isHoverable }]">
    <div class="infoBox" v-if="props.date" @click="handleClick">
      <div class="date">
    <p class="text">{{ props.date }}</p>
  </div>
  <div class="ev">
    <div class="wow" v-for="i in 10">
      <p>test</p>
    </div>
  
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { defineProps, computed, toRefs, defineEmits } from 'vue';
import { dateInfo } from "@/stores/date";


const store = dateInfo();

const props = defineProps<{
  date: number | string;
}>();

const { date } = toRefs(props);

const emit = defineEmits<{
  (e: 'popUp', payload: [number, number, number]): void;
}>();

const isHoverable = computed(() => {
  const dateValue = typeof date.value === 'string' ? parseInt(date.value) : date.value;
  console.log(dateValue);
  return dateValue > 0;
});

const handleClick = () => {
  store.date.popUp = true;
  const dateValue = typeof props.date === 'string' ? parseInt(props.date) : props.date;
  if (!isNaN(dateValue)) {
    emit('popUp', [store.date.month, dateValue, store.date.year]);
  }
};
</script>
  
  <style scoped>
  .date{  
    /* position: relative; */
  height: 100%;
    width: 20%;
    border-bottom: 2px solid black;
  }

p{
  margin: 7px;
}

.wow{
    background-color:ivory;
    border-radius: 10px;
    height: 50px;
  z-index: -1;
  border: 1px black solid;
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