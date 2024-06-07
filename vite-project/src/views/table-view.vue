<template>
    <div class="container">
       <div v-if="a==true"><div v-for="events in b">
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

    async function getUser()
    {let x = await supabase.auth.getUser()
        console.log(x.data.user.id)
    let theThingy = await supabase
    .from('profiles') 
    .select("*")
    .eq('id', x.data.user.id)
    let a = false
    let b = []
    let c =  theThingy.data[0].events
    c.forEach(async (eventId) => {
    let event = await supabase
    .from('event')
    .select("*")
    .eq('id', Number(eventId))
    b.push({eventName:event.data[0].eventName,dateDue: event.data[0].dateDue, eventType:event.data[0].eventType, eventUrgency: event.data[0].eventUrgency}) 
    a = true;
});
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