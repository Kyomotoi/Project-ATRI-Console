import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    IsDebug: localStorage.getItem('IsDebug') ? localStorage.getItem('IsDebug') : 'n',
    Host: localStorage.getItem('Host') ? localStorage.getItem('Host') : '',
    Port: localStorage.getItem('Port') ? localStorage.getItem('Port') : '',
  },
  getters: {
  },
  mutations: {
    authing(state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
      state.IsDebug = user.IsDebug
      if (state.IsDebug === "y") {
        localStorage.setItem('IsDebug', user.IsDebug)
        state.Host = user.Host
        localStorage.setItem('Host', user.Host)
        state.Port = user.Port
        localStorage.setItem('Port', user.Port)
      }
    },

    debug_model(state, user) {
      state.IsDebug = user.IsDebug
      localStorage.setItem('IsDebug', user.IsDebug)
    }
  },
  actions: {
  },
  modules: {
  }
})
