import { createStore } from 'vuex'
import goods_list from './modules/goods_list'
import good from './modules/good'
import user from './modules/user'
import categories_list from './modules/categories_list'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    goods_list,
    good,
    user,
    categories_list
  }
})
