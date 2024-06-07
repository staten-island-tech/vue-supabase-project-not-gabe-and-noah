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
        <RouterView></RouterView>
      </div>
  </header>
</template>

<style scoped>
#bottom{
  color:aqua;
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: calc(100% - 5%);
}

</style>
