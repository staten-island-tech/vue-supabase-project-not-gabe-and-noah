import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const info = defineStore('barView', () => {
  const auth = ref({
    log: false,
    email: "",
    name: "test",
    width: 85,
  })

  return { auth }
})
