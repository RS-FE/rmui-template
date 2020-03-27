const state = {
  operaMode: false,
  checkboxArray: []
}
const mutations = {
  changeEmailListMode(state) {
    state.operaMode = !state.operaMode
    state.checkboxArray = []
  }
}
const actions = {
  changeEmailListMode(context) {
    context.commit('changeEmailListMode')
  }
}
export default {
  state,
  mutations,
  actions
}
