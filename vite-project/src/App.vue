<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Login from '@/components/Login.vue';
let scene = 4
import main from '@/components/main.vue';
</script>

<template>


  <header>
    <NavBar></NavBar>
      <nav>
        <Login v-if="scene == 3"></Login>
       <main v-if="scene == 4"></main>
      </nav>
  </header>
</template>

<style scoped>


</style>
