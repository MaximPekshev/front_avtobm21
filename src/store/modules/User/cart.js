import Axios from 'axios'
import {backendPath} from "@/main.js"

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
                return state.cart.reduce((acc,item) => acc += (item.quantity*item.price), 0)
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
        async setCartItemQty ({commit}, params) {
            let authToken = params.authToken
            let good_id = params.good_id
            let originalQty = params.originalQty
            let newQty = params.newQty
            commit('cartLoadingSwitch', true)
            let delUrl = `${backendPath}/api/v1/cart/delete/`
            let delData = {
                "data" : [
                    {
                        "good_id" : good_id,
                        "quantity": Number(originalQty)
                    }
                ]
            }
            await Axios({
                method: 'post',
                headers: {
                    "Authorization": `Token ${authToken}`,
                },
                url: delUrl,
                data: delData,
            }).then(() => {
                let addUrl = `${backendPath}/api/v1/cart/add/`
                let addData = {
                    "data" : [
                        {
                            "good_id" : good_id,
                            "quantity": Number(newQty)
                        }
                    ]
                }
                Axios({
                    method: 'post',
                    headers: {
                        "Authorization": `Token ${authToken}`,
                    },
                    url: addUrl,
                    data: addData,
                }).then(response => {
                    commit('loadCartData', response.data.data)
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    commit('cartLoadingSwitch', false)
                })
            }).catch(error => {
                console.log(error)
            })
        },
        async addDelCartItem({commit}, params) {
            let good_id = params.good_id
            let quantity = params.quantity
            let authToken = params.authToken
            let action = params.action
            commit('cartLoadingSwitch', true)
            let url = ''
            if (action == 'add') {
                url = `${backendPath}/api/v1/cart/add/`
            } else {
                url = `${backendPath}/api/v1/cart/delete/`
            }
            let data = {
                "data" : [
                    {
                        "good_id" : good_id,
                        "quantity": Number(quantity)
                    }
                ]
            }
            await Axios({
                method: 'post',
                headers: {
                    "Authorization": `Token ${authToken}`,
                },
                url: url,
                data: data,
            }).then(response => {
                commit('loadCartData', response.data.data)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                commit('cartLoadingSwitch', false)
            })
        },
        async loadCart({commit}, authToken) {
            commit('cartLoadingSwitch', true)
            let url = `${backendPath}/api/v1/cart/`
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
        },
        async deleteAllCartItems({commit}, authToken) {
            let url = `${backendPath}/api/v1/cart/clear/`
            await Axios({
                method: 'get',
                headers: {
                    "Authorization": `Token ${authToken}`,
                },
                url: url,
            }).then(() => {
                commit('loadCartData', {})
            }).catch(error => {
                console.log(error)
            })
        }
    }
}