<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Login from '@/components/Login.vue';
import main from '@/components/main.vue';
</script>

<template>



  <NavBar></NavBar>
  <header>
      <nav>
       <Login></Login>
      </nav>
  </header>
</template>

<style scoped>


</style>
