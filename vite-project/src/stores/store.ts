import { ref } from 'vue';
import { defineStore } from 'pinia';

interface AuthState {
  log: boolean;
  email: string;
  name: string;
  width: number;
  mostRecentDate: string;
  errorMessage: string | null;
}

export const info = defineStore('barView', () => {
  const auth = ref<AuthState>({
    log: false,
    email: "",
    name: "test",
    width: 85,
    mostRecentDate: "",
    errorMessage: null
  });

  return { auth };
});
