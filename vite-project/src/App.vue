<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import Login from '@/components/Login.vue';
import Clock from '@/components/BigFlockingClock.vue'
let scene = 3
import { mapState } from 'pinia'
import { ref } from 'vue'
let ScreenHeight = ref(screen.height * .95)
</script>

<template>


  <header>
    <NavBar v-if="1"></NavBar>
    <SideBar></SideBar>
    <Clock></Clock>
    <div id="bottom">
        <Login v-if="scene == 3"></Login>
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
  width: calc(100%);
}

</style>
