// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return { showNav: true, stepNow: '', isDebug: false, noATRI: true, }
  },
})
