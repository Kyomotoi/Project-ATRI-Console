import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    BaseURL: localStorage.getItem('BaseURL') ? localStorage.getItem('BaseURL') : '',
  },
  getters: {
  },
  mutations: {
    authing(state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)

      state.BaseURL = user.BaseURL
      localStorage.setItem('BaseURL', user.BaseURL)
    }
  },
  actions: {
  },
  modules: {
  }
})
