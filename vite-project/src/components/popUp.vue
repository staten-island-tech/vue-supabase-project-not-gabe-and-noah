<template>
    <div id="hiRylan">
<p>New Event On {{`${props.date[0] + 1}/${props.date[1]}/${props.date[2]}`}}</p>
    </div>
</template>

<script setup lang="ts">
 const props = defineProps({
    date: String,
  });
</script>

<style scoped>
#hiRylan{
    background-color: white;
    position: fixed;
    top: 50%;
    right: 40.5%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(50%, -50%);
    z-index: 10000;
}
</style>