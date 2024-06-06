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
    background-color:beige;
    color: green;
    text-align: center;
    height: 100%;
}
</style>