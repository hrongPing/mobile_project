import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('toutiao_user')
  },
  mutations: {
    setToken (state, token) {
      state.user = token
      setItem('toutiao_user', state.user)
    }

  },
  actions: {
  },
  modules: {
  }
})
