<template>
    <div>
<p>test</p>
    </div>
</template>

<script setup lang="ts">
helloIzzy(test);

function helloIzzy(fn: (a: string) => void) {
  fn("Hello, World");
}
</script>

<style scoped>

</style>