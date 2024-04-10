import Axios from 'axios'
import {backendPath} from "@/main.js"

export default {
    state: {
        orders_list: [],
        orders_list_loading: false,
    },
    getters: {
        ordersList: state => {
            return state.orders_list
        },
        orderListQty: state => {
            return state.orders_list.length
        },
        ordersListLoading: state => {
            return state.orders_list_loading
        }
    },
    mutations: {
        loadOrdersList (state, payload) {
            state.orders_list = payload
        },
        orderListLoadingSwitch (state, payload) {
            state.orders_list_loading = payload
        }
    },
    actions: {
        async loadOrdersList({commit}, authToken) {
            commit('orderListLoadingSwitch', true)
            let url = `${backendPath}/api/v1/order/`
            await Axios({
                method: 'get',
                headers: {
                    "Authorization": `Token ${authToken}`
                },
                url: url
            }).then(response => {
                commit('loadOrdersList', response.data.data)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                commit('orderListLoadingSwitch', false)
            })
        },
        async placeAnOrder({commit}, params) {
            commit('orderListLoadingSwitch', true)
            let authToken = params.authToken
            let contractId = params.contract_id
            let cart = params.cart
            let cartItems = []
            cart.forEach((item) => {
                cartItems.push({
                    "good_id": item.good.id,
                    "quantity": item.quantity,
                    "price": item.good.price,
                    "summ": (item.good.price*item.quantity).toFixed(2)
                })
            })
            let data = {
                "data": [
                    {
                        "contract_id": contractId,
                        "items": cartItems
                    }
                ]
            }
            let url = `${backendPath}/api/v1/order/`
            await Axios({
                method: 'post',
                headers: {
                    "Authorization": `Token ${authToken}`
                },
                url: url,
                data: data,
            }).then({
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                commit('orderListLoadingSwitch', false)
            })
        },
        clearOrdersList({commit}, payload) {
            commit('loadOrdersList', payload)
        }
    }
}