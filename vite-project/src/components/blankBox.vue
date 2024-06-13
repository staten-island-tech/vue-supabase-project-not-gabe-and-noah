<template>
    <div>
        <div class="box">
            <p class="dae">{{ props.day }}</p>
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
    z-index: 222;
    height:100%;
    background-color:#508b74;
    color: white;
    border: 2px black solid;
    color: green;
}
.dae{
    color: white;
}
</style>