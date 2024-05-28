<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Login from '@/components/Login.vue';
</script>

<template>
  <header>
      <nav>
        <Login />
      </nav>
  </header>
</template>

<style scoped>

</style>
