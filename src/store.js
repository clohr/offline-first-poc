import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connectivity: 'online'
  },
  mutations: {
    UPDATE_CONNECTIVITY (state, data) {
      Vue.set(state, 'connectivity', data)
    },
  },
  actions: {
    updateConnectivity ({ commit }, data) {
      commit('UPDATE_CONNECTIVITY', data)
    },
  },
})
