<template>
  <div class="barBody" :id="store.auth.log.toString()">
    <div class="username">{{ store.auth.log ? 'Welcome!' : 'Sign In' }}</div>
    <div class="links-container" v-if="store.auth.log">
      <router-link class="routerLink" to="/table-view">Table View</router-link>
      <router-link class="routerLink" to="/invite">Invite Thing</router-link>
    </div>
    <div v-if="store.auth.errorMessage" class="error-message">{{ store.auth.errorMessage }}</div>
    <div class="clock"><BigFlockingClock /></div>
  </div>
</template>

<script setup lang="ts">
import { info } from "@/stores/store"
const store = info(); 
import { ref } from "vue";
let name = ref(store.auth.name)
import BigFlockingClock from './BigFlockingClock.vue';
</script>

<style scoped>
#false {
  width: 100%;
}

#true {
  width: calc(85%);
}

.barBody {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #e5e5e5;
  transition: 1.5s;
  background-color: aqua;
  top: 0px;
  right: 0px;
  height: 5%;
  margin: 0px;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  transition: transform 2s;
  transform: translateY(0);
}

.username,
.clock,
.routerLink {
  font-size: 1.2em;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

.clock {
  width: 150px;
}

.error-message {
  font-size: 1em;
  color: #ff4b2b;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

.links-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.routerLink {
  text-decoration: none;
  text-align: center;
  color: #333;
  margin: 20px; 
}
.routerLink:hover {
  text-decoration: none;
  color: #339989;
}
</style>