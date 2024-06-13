<template>
  <div>
    <nav class="nav-bar">
        <div class="icon-nav">
            <img src="https://i.imgur.com/xblVXWU.png" id='sea'>
            <span class="logo">{{ store.auth.log ? store.auth.name : 'Sign In' }}</span>
        </div>

        <ul class="list-nav-bar active">
            <li class="list-item"><a href="#">home</a></li>
            <li class="list-item"><a href="#">pricing</a></li>
            <li class="list-item"><a href="#">faq</a></li>
            <li class="list-item"><a href="#">about</a></li>
            <li class="list-item"><a href="#">contact</a></li>
        </ul>
        <div class="fas burger-menu" id="burger-menu">&#9776;</div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { info } from "@/stores/store";
import { ref } from "vue";
import BigFlockingClock from './BigFlockingClock.vue';


const store = info();
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.icon-nav{
    display: flex;
  max-height: 100px;
  align-items: center;
}

#sea{

  width: auto;
  height: 50px;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins','Open Sans',Arial;
}

body {
    min-height: 100vh;
    background-image: url('https://i.pinimg.com/564x/9d/1f/2e/9d1f2e441590c09d737125a61b5f5281.jpg');
    background-size: cover;
    background-position: center;
}


.nav-bar {
    display: flex;
    z-index: 10000000;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    padding: 25px 1.5rem;
    position: absolute;
    left: 1%;
    width: 98%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.5);
}

.logo {
    color: aliceblue;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.25rem;
    margin-left: 12px;
    cursor: pointer;
}

.fas {
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
}

.list-nav-bar {
    list-style: none;
    text-transform: uppercase;
    display: flex;
    gap: 20px;
}

.list-item a {
    cursor: pointer;
    font-size: 1.25rem;
    text-decoration: none;
    color: #fff;
    text-align: center;
    margin-left: 0.5rem;
    letter-spacing: 0.1rem;
}

.list-item a:hover {
    color: #a0a0a0;
}

.burger-menu {
    display: none;
}

.main-content {
    text-align: center;
    margin-top: 25vh;
}

.main-content h1 {
    color: #fff;
    font-size: 3.5rem;
}


@media screen and (max-width: 768px) {

    .list-item a {
        font-size: 0.875rem;
    }

    .logo {
        font-size: 0.875rem;
    }
}

@media screen and (max-width: 578px) {

    .list-item a {
        font-size: 1rem;

    }

    .list-nav-bar.active {
        right: 0;
    }

    .list-nav-bar {
        display: flex;
        position: fixed;
        right: -100%;
        top: 60px;
        width: 35%;
        background-color: rgba(0, 0, 0, 0.2);
        text-align: center;
        flex-direction: column;
        transition: 0.7s;
        gap: 18px;
        border-radius: 0 0 10px 10px;
    }

    .burger-menu {
        display: block;
        cursor: pointer;
    }
}

</style>