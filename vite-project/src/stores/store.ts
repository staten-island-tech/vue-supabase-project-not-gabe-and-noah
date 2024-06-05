import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const info = defineStore('barView', () => {
  const auth = ref({
    name: false,
    email: false,

  })

  return { auth }
})
