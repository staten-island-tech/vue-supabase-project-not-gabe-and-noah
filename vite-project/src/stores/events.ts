import { ref } from 'vue';
import { defineStore } from 'pinia';

interface AuthState {
events: object
}

export const eventsPin = defineStore('eventsPin', () => {
  const data = ref<AuthState>({
    events: {},
  });

  return { data };
});
