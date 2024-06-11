<template>
    <div class="container">
      <div v-if="viewedArray && viewedArray.length > 0">
        <ul>
          <div v-for="event in viewedArray" :key="event.id">
            <events :eventTitle="event.eventTitle" :urgency="event.urgency" :time="event.time" :date="event.date" />
          </div>
        </ul>
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
      }
    }
  } catch (error) {
    console.error('not bazinga');
  }
}
getUser();
</script>

  
<style scoped>

.container {
  height: 100%;
  overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: teal;
}

</style>