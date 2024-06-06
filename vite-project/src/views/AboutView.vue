<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { info } from "@/stores/store"
import { useRouter } from 'vue-router'
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