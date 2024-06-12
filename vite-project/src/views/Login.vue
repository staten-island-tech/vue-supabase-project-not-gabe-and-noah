<template>
  <div class="page">
    <wave></wave>
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <span>Use your email for registration.</span>
          <input type="text" placeholder="Username" v-model="username" />
          <input type="email" placeholder="Email" v-model="emailSign" />
          <input type="password" placeholder="Password" v-model="passwordSign" />
          <button @click.prevent="createAccount">Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <span>Use your account to sign in.</span>
          <input type="email" placeholder="Email" v-model="emailLog" />
          <input type="password" placeholder="Password" v-model="passwordLog" />
          <a href="#">Forgot your password?</a>
          <button @click.prevent="login">Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Log back in to continue using our website.</p>
            <button class="ghost" id="signIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>New to our website?</h1>
            <p>Create an account now!</p>
            <button class="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import wave from '@/components/wave.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { supabase } from "../lib/supabaseClient.ts";
import { info } from "@/stores/store";

const store = info();
const router = useRouter();
const route = useRoute();

const username = ref<string>("");
const emailSign = ref<string>("");
const passwordSign = ref<string>("");
const emailLog = ref<string>("");
const passwordLog = ref<string>("");

async function createAccount() {
  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: emailSign.value,
      password: passwordSign.value,
    });

    if (signUpError) {
      console.log(signUpError);
      store.auth.errorMessage = signUpError.message;
    } else {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: emailSign.value,
        password: passwordSign.value,
      });

      if (signInError) {
        console.log(signInError);
        store.auth.errorMessage = signInError.message;
      } else {
        console.log(signInData);
        if (signInData && signInData.user) {
          store.auth.log = true;
          store.auth.name = signInData.user.email;
          store.auth.errorMessage = "";

          const { data: updateUser, error: updateUserError } = await supabase
            .from('profiles')
            .update({ username: username.value })
            .eq('id', signInData.user.id);

          if (updateUserError) {
            console.log(updateUserError);
          } else {
            console.log(updateUser);
            router.replace({ path: '/calendar' });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error creating account:', error);
  }
}

async function login() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailLog.value,
      password: passwordLog.value,
    });

    if (error) {
      console.log(error);
      store.auth.errorMessage = error.message;
    } else {
      console.log(data);
      if (data && data.user) {
        store.auth.log = true;
        store.auth.name = data.user.email;
        store.auth.errorMessage = "";
        router.replace({ path: '/calendar' });
      }
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      console.log('Logged out!');
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

onMounted(() => {
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');

  if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }
});
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

h1 {
  font-weight: bold;
  margin: 0;
  color: #010503;
}

h2 {
  text-align: center;
  color: #010503;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: #fffafb;
}

span {
  font-size: 12px;
  color: #fffafb;
}

a {
  color: #010503;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #010503;
  background-color: #010503;
  color: #fffafb;
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
  border-color: #fffafb;
}

form {
  background-color: #fffafb;
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

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  overflow: hidden;
}

.container {
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 
              0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  width: 1068px;
  max-width: 100%;
  min-height: 580px;
  border: 2px solid #fffafb;
  overflow: hidden;
  background: #fffafb; 
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

.sign-in-container h1,
.sign-up-container h1,
.sign-in-container span,
.sign-up-container span,
.sign-in-container p,
.sign-up-container p {
  color: #010503;
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

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #010503;
  background: -webkit-linear-gradient(to right, #C0C6CB, #98A5C0);
  background: linear-gradient(to right, #C0C6CB, #98A5C0);
  background-repeat: no-repeat;
  opacity: .8;
  background-size: cover;
  background-position: 0 0;
  color: #fffafb;
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
  background-color: #131515;
  color: #fffafb;
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
  color: #89847e;
}

footer a {
  color: #89847e;
  text-decoration: none;
}
</style>