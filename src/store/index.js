import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import nav from './modules/nav'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    nav
  },
  getters
})

export default store
