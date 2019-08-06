import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

import user from './user'

Vue.use(Vuex)
const state = {
  router: router,
}

export default new Vuex.Store({
  state,
  plugins: [
    createPersistedState({
      key: 'video-moments',
      paths: ['user'],
    }),
  ],
  modules: {
    user,
  },
})
