<template>
    <div>
        <div class="box">
            <p>{{ props.day }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    day: String,
})  
</script>

<style scoped>
.box{
    height:100%;
    background-color:beige;
    border: 2px black solid;
    color: green;
}
</style>