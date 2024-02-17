import Axios from 'axios'

export default {
    state: {
        cart: [],
        cart_loading: false,
    },
    getters: {
        cart: state => {
            return state.cart
        },
        cartQty: state => {
            return state.cart.length
        },
        cartAmount: state => {
            if (state.cart.length > 0) {
                return state.cart.reduce((acc,item) => acc += (item.quantity*item.good.price), 0)
            } else {
                return 0
            }
        },
        cartItemById: state => id => {
            return state.cart.find(cartItem => cartItem.good.id === id)
        },
        cart_loading: state => {
            return state.cart_loading
        }
    },
    mutations: {
        loadCartData (state, payload) {
            state.cart = payload
        },
        cartLoadingSwitch (state, payload) {
            state.cart_loading = payload
        }
    },
    actions: {
        async addDelCartItem({commit}, params) {
            let good_id = params.good_id
            let quantity = params.quantity
            let authToken = params.authToken
            let action = params.action
            commit('cartLoadingSwitch', true)
            let url = ''
            if (action == 'add') {
                url = `https://back.avtobm21.ru/api/v1/cart/add/`
            } else {
                url = `https://back.avtobm21.ru/api/v1/cart/delete/`
            }
            let data = {
                "data" : [
                    {
                        "good_id" : good_id,
                        "quantity": quantity
                    }
                ]
            }
            console.log(data)
            await Axios({
                method: 'post',
                headers: {
                    "Authorization": `Token ${authToken}`,
                },
                url: url,
                data: data,
            }).then(response => {
                console.log(response)
                commit('loadCartData', response.data.data)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                commit('cartLoadingSwitch', false)
            })
        },
        async loadCart({commit}, authToken) {
            commit('cartLoadingSwitch', true)
            let url = `https://back.avtobm21.ru/api/v1/cart/`
            await Axios({
                method: 'get',
                headers: {
                    "Authorization": `Token ${authToken}`,
                },
                url: url,
            }).then(response => {
                commit('loadCartData', response.data.data)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                commit('cartLoadingSwitch', false)
            })
        },
        clearCart({commit}, payload) {
            commit('loadCartData', payload)
        }
    }
}