<template>
  <div @click="handleClick" :class="['box', { 'hoverable': isHoverable }]">
    <div class="infoBox" v-if="props.date">
    <p class="text">{{ props.date }}</p>
    <p>test</p>    <p>test</p>    <p>test</p>    <p>test</p>
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

  .infoBox{
    display: flex;
    padding: 0px;
    flex-direction: column;
    overflow: auto;
  }
  .box {
    background-color: azure;
    border: 1px gray solid;
    color: blue;
    position: relative;
    overflow: scroll;
    display: flex;  
    justify-content: flex-start;
    align-items: flex-start;
height:91px;
-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
    width: 1fr;
    box-sizing: border-box;
  }
  .example::-webkit-scrollbar {
  display: none;
}
  
  
  .hoverable:hover {
    transition: 0.75s;
    background-color: gold;
  }
  </style>