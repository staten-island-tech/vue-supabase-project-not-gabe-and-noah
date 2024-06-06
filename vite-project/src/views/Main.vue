<template>
<calendar></calendar>
</template>

<style>

</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { info } from "@/stores/store"
import { useRouter } from 'vue-router'
import calendar from "@/components/Calendar.vue"
const router = useRouter()
const store = info(); 

onMounted(() => {
  if(!store.auth.name){
    router.replace({ path: '/' })
  }
  else{
    console.log(store.auth)
  }
})

</script>