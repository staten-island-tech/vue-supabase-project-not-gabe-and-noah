import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const dateInfo = defineStore('dates', () => {
  const date = ref({
    month: 0,
    year: 0,
    popUp: false,
  })

  return { date }
})
