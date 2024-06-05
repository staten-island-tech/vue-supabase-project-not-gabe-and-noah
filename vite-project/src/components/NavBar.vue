<template>
  <div class="barBody" :id="store.auth.name.toString()">
<BigFlockingClock></BigFlockingClock>
  </div>
</template>

<script setup lang="ts">
import { info } from "@/stores/store"
const store = info(); 
import BigFlockingClock from './BigFlockingClock.vue';
console.log(store.auth.name);
</script>

<style scoped>
#false{
  width: 100%;
}

#true{
  width: calc(85% - 2px);
}

.barBody{
  border:1px solid #e5e5e5;
  background-color: aqua;
  top: 0px;
  right: 0px;
  height: 5%;
  position: absolute;
  text-align: center;
}
</style>