<template>
    <div class="container">
      <div v-if="viewedArray && viewedArray.length > 0" id="what">
            <events v-for="event in viewedArray" :key="event.id" :eventTitle="event.eventTitle" :urgency="event.urgency" :time="event.time" :date="event.date" />
      </div>
      <div v-else>
        Nothing here!
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from "../lib/supabaseClient.ts";
import events from "@/components/events.vue";
import { info } from "@/stores/store"
import { useRouter } from 'vue-router'
import calendar from "@/components/Calendar.vue"
const router = useRouter()
const store = info(); 
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
      }
    }
  } catch (error) {
    console.error('not bazinga');
  }
}
getUser();

function compareFn(a: object, b: object) {
  // let test = a['date'].split("-", 3)
  if(a['date' as keyof Object].split("-", 3)[0] + a['date' as keyof Object].split("-", 3)[1] + a['date' as keyof Object].split("-", 3)[2] > b['date' as keyof Object].split("-", 3)[0] + b['date' as keyof Object].split("-", 3)[1] + b['date' as keyof Object].split("-", 3)[2]){
    return -1
  }
else{
  return 1
}
}
if (store.auth.log) {
            console.log(store.auth.log);
          } else {
            console.log(store.auth.log);
            router.replace({ path: '/calendar' });
          }
        
</script>

  
<style scoped>
#what{
  display: flex;
  width: 100%;
}
.container {
  height: 100%;
  overflow-y: auto;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    left: 0;
    width: 100%;
    height:calc(100vh - 100px);
    
}

</style>