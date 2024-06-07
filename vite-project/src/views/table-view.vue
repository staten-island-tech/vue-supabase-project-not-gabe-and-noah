<template>
    <div>hiii</div>
</template>
    
    <style>
    
    </style>
    
    <script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { supabase } from "../lib/supabaseClient.ts";

    async function getUser()
    {let x = await supabase.auth.getUser()
        console.log(x.data.user.id)
    let theThingy = await supabase
    .from('profiles')
    .select("*")
    .eq('id', x.data.user.id)
    let b = []
    theThingy.data[0].events.forEach(async (eventId) => {
    let event = await supabase
    .from('event')
    .select("*")
    .eq('id', Number(eventId))
    b.push(event) 
    console.log(b)
    });
    }
    getUser()
    </script>