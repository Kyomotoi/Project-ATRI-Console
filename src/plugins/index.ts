/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify'

import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueAxios, axios)
    .use(Vue3Toastify, {
      position: toast.POSITION.BOTTOM_RIGHT,
      transition: toast.TRANSITIONS.SLIDE,
    } as ToastContainerOptions)
}
