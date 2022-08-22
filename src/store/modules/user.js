import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    // 设置token
    setToken(state, payload) {
      state.token = payload
      setToken(payload)
    },
    // 删除token
    removeToken(state) {
      state.token = ''
      removeToken()
    }
  },
  actions: {
  }
}
