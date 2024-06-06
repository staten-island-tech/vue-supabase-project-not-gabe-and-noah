<template>
  <Transition>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: goldenrod;
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