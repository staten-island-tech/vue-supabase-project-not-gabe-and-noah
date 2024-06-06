<template>
    <div>
        <input type="year" placeholder="Insert the year." ref="year"/>
        <input type="month" placeholder="Insert the month (numerically)." ref="month"/>
        <input type="day" placeholder="Insert the day." ref="day"/>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

let year = ref("").value;
let month = ref("").value;
let day = ref("").value;

const d = new Date();
d.setFullYear(year.value, month.value - 1, day.value)

</script>

<style scoped>

</style>