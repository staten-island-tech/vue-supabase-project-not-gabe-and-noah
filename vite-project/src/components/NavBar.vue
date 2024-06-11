<template>
  <div class="barBody" :id="store.auth.log.toString()">
    <div class="username">{{ store.auth.log ? store.auth.name : 'Sign In' }}</div>
    <div class="links-container" v-if="store.auth.log">
      <router-link class="routerLink" to="/table-view">Table View</router-link>
      <router-link class="routerLink" to="/calendar">Calendar</router-link>
    </div>
    <div v-if="store.auth.errorMessage" class="error-message">{{ store.auth.errorMessage }}</div>
    <div class="clock"><BigFlockingClock /></div>
  </div>
</template>

<script setup lang="ts">
import { info } from "@/stores/store";
import { ref } from "vue";
import BigFlockingClock from './BigFlockingClock.vue';

const store = info();
</script>

<style scoped>
.barBody {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #e5e5e5;
  background-color: #008080; /* Changed to a not-so-bright teal color */
  position: absolute;
  top: 0;
  right: 0;
  height: 5%;
  width: 100%;
  box-sizing: border-box;
}

.username {
  font-size: 1.2em;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-align: left;
  flex: 1;
}

.links-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.routerLink {
  text-decoration: none;
  text-align: center;
  color: #333;
  margin: 0 20px;
  font-size: 1.2em;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

.routerLink:hover {
  color: #339989;
}

.clock {
  font-size: 1.2em;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-align: right;
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.error-message {
  font-size: 1em;
  color: #ff4b2b;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}
</style>
