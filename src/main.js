import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueGtag from 'vue-gtag'
Vue.use(VueGtag, {
  config: { id: 'G-2HYS55GFX1' }
})

import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)

import Toastr from './plugins/toastr'
Vue.use(Toastr)

import Axios from './plugins/axios'
Vue.use(Axios)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

export default new Vuetify({
  theme: { dark: true }
})
