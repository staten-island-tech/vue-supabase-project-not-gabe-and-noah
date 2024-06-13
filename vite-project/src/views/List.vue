<template>
    <div id="cont">
<row :one="topRow.name" :two="topRow.dueDay" :three="topRow.dueTime" :four="topRow.urgency" :five="topRow.desc"></row>
<row v-for="i in eventStore.data.events" :one="i.eventTitle" :two="i.date" :three="i.time" :four="i.urgency" :five="i.id"></row>
    </div>
</template>

<script setup lang="ts">
import row from "@/components/row.vue"
import { eventsPin } from '@/stores/events.ts';
import { info } from "@/stores/store.ts"
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const eventStore = eventsPin();
const store = info()
console.log(eventStore.data.events)
let topRow = {
    name: 'Title',
    dueDay: 'DueBy',
    dueTime: 'DueTime',
    urgency: 'Urgency',
    desc: 'Disc',
}

console.log(eventStore.data)

if (store.auth.log) {
            console.log(store.auth.log);
          } else {
            console.log(store.auth.log);
            router.replace({ path: '/calendar' });
          }
</script>

<style scoped>
#cont {
  background-color: lightgray;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: .5fr repeat(12, 1fr);
  height:calc(100vh - 100px);
  position: absolute;
  bottom: 1%;
  left: 50%;
  overflow:auto;

  position: fixed;
    width: 85%;
    transform: translate(-50%,0%);
    border-radius: 10px;
    border: 2px solid black;
    z-index: 10;
}
</style>