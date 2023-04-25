// Utilities
import { defineStore } from 'pinia'

import { Notices } from '@/core/notification'

export const useAppStore = defineStore('app', {
  state: () => {
    return { showNav: true, stepNow: '', isDebug: false, noATRI: true, }
  },
})

export const Notifications = defineStore('notice', {
  state: (): { notices: Notices } => {
    return {
      notices: {}
    }
  },
})
