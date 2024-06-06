<template>
    <div class="box">
<p v-if="props.date > 0">{{props.date}}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
        date: Number,
    })  
</script>

<style scoped>

.box{

    background-color: azure;
    border: 2px black solid;
    color: blue;
}

.box:hover{
    transition: .75s;
background-color: gold;
}
</style>