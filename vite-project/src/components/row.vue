<template>
    <div v-for="i in ['one','two','three','four','five']" :class="props['four']" class="box">{{ props[`${i}`] }}</div>
</template>

<script setup lang="ts">


const props = defineProps<{
  one: string | number;
  two: string | number;
  three: string | number;
  four: string | number;
  five: string | number;
}>();

console.log(props)

</script>

<style scoped>


.box{
    height: 100%;
    width: 100%;
    display: flex;
    background-color: green;
    text-align: center;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    border-left: 2px dashed black;
}
.High, .Low, .Medium{
    height: 100%;
}
.Urgency{
    background-color: aqua;
}

</style>