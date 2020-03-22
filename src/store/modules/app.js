const state = {
  device: ''
}
const mutations = {
  SET_DEVICE(state, device) {
    state.device = device
  }
}
const actions = {
  // 设备信息
  setDevice({commit}, device) {
    commit('SET_DEVICE', device)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
