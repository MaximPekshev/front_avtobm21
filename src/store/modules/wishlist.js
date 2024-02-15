import Axios from 'axios'

export default {
    state: {
        wishlist: [],
        wishlist_loading: false,
        wishlist_item_loading: false,
    },
    getters: {
        wishlist: state => {
            return state.wishlist
        },
        wishlistQty: state => {
            return state.wishlist.length
        },
        wishlistItemById: state => id => {
            return state.wishlist.find(wishlistItem => wishlistItem.good.id === id)
        },
        wishlist_loading: state => {
            return state.wishlist_loading
        },
        wishlist_item_loading: state => {
            return state.wishlist_item_loading
        }
    },
    mutations: {
        loadWishlist (state, payload) {
            state.wishlist = payload
        },
        wishlistLoadingSwitch (state, payload) {
            state.wishlist_loading = payload
        },
        wishlistLoadingItemSwitch (state, payload) {
            state.wishlist_item_loading = payload
        }
    },
    actions: {
        async addDelWishlistItem({commit}, params) {
            let good_id = params.good_id
            let authToken = params.authToken
            let action = params.action
            commit('wishlistLoadingSwitch', true)
            let url = ''
            if (action == 'add') {
                url = `https://back.avtobm21.ru/api/v1/wish/add/?good_id=${good_id}`
            } else {
                url = `https://back.avtobm21.ru/api/v1/wish/delete/?good_id=${good_id}`
            }
            await Axios({
                method: 'get',
                headers: {
                    "Authorization": `Token ${authToken}`,
                },
                url: url,
            }).then(response => {
                console.log(response)
                commit('loadWishlist', response.data.data)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                commit('wishlistLoadingSwitch', false)
            })
        },
        async loadWishlist({commit}, authToken) {
            commit('wishlistLoadingSwitch', true)
            let url = `https://back.avtobm21.ru/api/v1/wish/`
            await Axios({
                method: 'get',
                headers: {
                    "Authorization": `Token ${authToken}`,
                },
                url: url,
            }).then(response => {
                commit('loadWishlist', response.data.data)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                commit('wishlistLoadingSwitch', false)
            })
        }
    }
}