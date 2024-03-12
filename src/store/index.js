import { createStore } from 'vuex'
import goods_list from './modules/goods_list'
import good from './modules/good'
import user from './modules/user'
import categories_list from './modules/categories_list'
import wishlist from './modules/wishlist'
import cart from './modules/cart'
import contract from './modules/contract'
import orders from './modules/order'

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
    categories_list,
    wishlist,
    cart,
    contract,
    orders
  }
})
