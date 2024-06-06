<template>
	<wave></wave>
<div class="container" id="container">
	<div class="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<span>Use your email for registration.</span>
			<input type="username" placeholder="Username" ref="username" />
			<input type="emailSign" placeholder="Email" ref="emailSign" />
			<input type="passwordSign" placeholder="Password" ref="passwordSign" />
			<button @click.prevent.self @click="createAccount">Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<span>Use your account to sign in.</span>
			<input type="emailLog" placeholder="Email"  ref="emailLog"/>
			<input type="passwordLog" placeholder="Password" ref="passwordLog"/>
			<a href="#">Forgot your password?</a>
			<button @click.prevent.self @click="login">Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>Log back in to continue using our website.</p>
				<button class="ghost" id="signIn"> Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>New to our website?</h1>
				<p>Create an account now!</p>
				<button class="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>
</template>

<script setup lang="ts">

import wave from '@/components/wave.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue';
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient.ts";
import { info } from "@/stores/store"
const store = info(); 
const router = useRouter()
const route = useRoute()
let username = ref("").value;
let emailSign = ref("").value;
let passwordSign = ref("").value;
let emailLog = ref("").value;
let passwordLog = ref("").value;

async function createAccount(){
	console.log(emailSign.value,passwordSign.value)
    const {data, error} = await supabase.auth.signUp({
      email: emailSign.value,
      password: passwordSign.value,
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
      email: emailLog.value,
      password: passwordLog.value,
    }) 
    if (error) {
      console.log(error)
    } else {
      console.log(data)
	  console.log("wrk")
	  store.auth.name = true
	  router.replace({ path: '/about' })
    }
  }

async function logout(){
    const {error} = await supabase.auth.signOut();
    if (error) {
      console.log(error)
    } else { console.log('logged out!!!')}
  }

onMounted(() => {
	const signUpButton = document.getElementById('signUp');
	const signInButton = document.getElementById('signIn');
	const container = document.getElementById('container');

	signUpButton.addEventListener('click', () => {
		container.classList.add("right-panel-active");
	});

	signInButton.addEventListener('click', () => {
		container.classList.remove("right-panel-active");
	});
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
	box-sizing: border-box;
}

body {
	background: #f6f5f7;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Montserrat', sans-serif;
	height: 100vh;
	margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
	color:#9e9797;
}

h2 {
	text-align: center;
	color:#9e9797;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
	color:#9e9797;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #FF4B2B;
	background-color: #FF4B2B;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}   

.container {
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: absolute;
	top: 50%;
	left: 50%;
	overflow: hidden;
	width: 1068px;
	max-width: 100%;
	min-height: 580px;
	border-color: black solid 2px;
	transform: translate(-50%, -50%);

}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #FF416C;
	background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
	background: linear-gradient(to right, #FF4B2B, #FF416C);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}
</style>