import { ref } from 'vue';
import { defineStore } from 'pinia';

interface AuthState {
events: object
}

export const events = defineStore('events', () => {
  const auth = ref<AuthState>({
    events: {},
  });

  return { auth };
});
