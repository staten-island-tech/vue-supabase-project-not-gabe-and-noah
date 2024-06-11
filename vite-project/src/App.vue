<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import Clock from '@/components/BigFlockingClock.vue'
let scene = 3
import { mapState } from 'pinia'
import { ref } from 'vue'
let ScreenHeight = ref(screen.height * .95)
import { info } from "@/stores/store"
const store = info(); 
</script>

<template>


  <header>
    <NavBar v-if="1" v-bind:style="{ width: store.auth.log ? '100%' : '100%' }"></NavBar>
    <div id="bottom" v-bind:style="{ width: store.auth.log ? '100%' : '100%' }">
      
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
      </router-view>
      </div>
  </header>
</template>

<style scoped>
.route-enter-from {
  /* opacity: 0; */
  transform: rotate3d(1,0,0,360deg);
}
.route-enter-active {
  transition: all .5s ease-out; 
}
.route-leave-to {
  /* opacity: 0; */
  transform: rotate3d(1,0,0,360deg);
  /* transform: translateX(-100px); */
}
.route-leave-active {
  transition: all .5s ease-in; 
}
#bottom{
  color:aqua;
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: calc(100% - 5%);
}

</style>
