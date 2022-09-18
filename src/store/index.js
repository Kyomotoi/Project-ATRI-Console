import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    isDebug: localStorage.getItem("isDebug") ? localStorage.getItem("isDebug") : '',
  },
  getters: {
  },
  mutations: {
    authing(state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
    },

    enabDebug(state, enab) {
      state.isDebug = enab.isDebug
      localStorage.setItem('isDebug', enab.isDebug)
    }
  },
  actions: {
  },
  modules: {
  }
})
