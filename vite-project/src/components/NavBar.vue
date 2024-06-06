<template>
  <div class="barBody" :id="store.auth.name.toString()">

    <div v-if="store.auth.name == true" id="loggedIn" >
      <BigFlockingClock></BigFlockingClock>
    </div>
    <div v-else id="loggedOut" >
<p>logged out</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { info } from "@/stores/store"
const store = info(); 
import BigFlockingClock from './BigFlockingClock.vue';
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
  transition: 1.5s;
  background-color: aqua;
  top: 0px;
  right: 0px;
  height: 5%;
  position: absolute;
  text-align: center;
}
</style>