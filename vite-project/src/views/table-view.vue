<template>
    <div class="container">
       <div v-if="b && b != ''">
        <div v-for="events in b" :key="b" :eventTitle="events.eventTitle" :urgency="events.urgency" :time="events.time" :date="events.date">
        <events></events>
       </div>        
</div> 
    </div>
</template>
     
    <style>
    
    </style>
    
    <script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { supabase } from "../lib/supabaseClient.ts";
    import events from "@/components/events.vue";
    import sharedEvents from "../components/sharedEvents.vue";

    const b = ref([]);

    async function getUser(){
    let x = await supabase.auth.getUser()
    console.log(x.data.user.id)
    let theThingy = await supabase
    .from('profiles') 
    .select("*")
    .eq('id', x.data.user.id)
    let c =  theThingy.data[0].events
    c.forEach(async (eventId) => {
    let event = await supabase
    .from('event')
    .select("*")
    .eq('id', Number(eventId))
    b.value.push({eventTitle:event.data[0].eventName, date: event.data[0].dateDue, time:event.data[0].eventType, urgency: event.data[0].eventUrgency}) 
});
    console.log(b.value)
    }
    getUser()
    </script>
<style scoped>

.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: teal;
}

</style>