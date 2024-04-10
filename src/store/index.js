import { createStore } from 'vuex'
import goods_list from './modules/Good/goods_list'
import good from './modules/Good/good'
import user from './modules/User/user'
import categories_list from './modules/Good/categories_list'
import wishlist from './modules/User/wishlist'
import cart from './modules/User/cart'
import contract from './modules/Order/contract'
import order_list from './modules/Order/order_list'
import order from './modules/Order/order'
import advertisement_list from './modules/advertisement_list'

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
    order_list,
    order,
    advertisement_list
  }
})
