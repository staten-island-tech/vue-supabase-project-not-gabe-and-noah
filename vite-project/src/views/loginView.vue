<template>
  <div class="inputs">
    <label for="email"> Email: </label>
    <input type="email" id="email" v-model="email">
  </div>
  <div class="inputs">
    <label for="password"> Password: </label>
    <input type="password" id="password" v-model="password">
  </div>
  <div class="inputContainer">
    <button @click="createAccount"> Create </button>
    <button @click="seeCurrentUser"> See User </button>
    <button @click="login"> Login </button>
    <button @click="logout"> Logout </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient.ts";

let email = ref("");
let password = ref("");

async function createAccount(){
    const {data, error} = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })
    if (error){
      console.log(error)
    } else{
      console.log(data)
    }
  }

async function seeCurrentUser(){
    const localUser = await supabase.auth.getSession();
    console.log(localUser)
  }

async function login(){
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    }) 
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }

async function logout(){
    const {error} = await supabase.auth.signOut();
    if (error) {
      console.log(error)
    } else { console.log('logged out!!!')}
  }
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
