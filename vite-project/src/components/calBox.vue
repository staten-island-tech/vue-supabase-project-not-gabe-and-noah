<template>
  <div @click="handleClick" :class="['box', { 'hoverable': isHoverable }]">
    <p>{{ props.date }}</p>
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
  .box {
    background-color: azure;
    border: 1px gray solid;
    color: blue;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  
  
  .hoverable:hover {
    transition: 0.75s;
    background-color: gold;
  }
  </style>