import Axios from 'axios'
import {backendPath} from "@/main.js"

export default {
    state: {
        orders_list: [],
        pageQty: 0,
        ordersOnPageQty: 0,
        orders_list_loading: false,
        currentPage: 1,
        orderAvailPagesBeforeCurrent: [],
        orderAvailPagesAfterCurrent: [],
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
        },
        pageQty: state => {
            return state.pageQty
        },
        ordersOnPageQty: state => {
            return state.ordersOnPageQty
        },
        currentPage: state => {
            return state.currentPage
        },
        orderAvailPagesBeforeCurrent: state => {
            return state.orderAvailPagesBeforeCurrent
        },
        orderAvailPagesAfterCurrent: state => {
            return state.orderAvailPagesAfterCurrent
        }
    },
    mutations: {
        loadOrdersList (state, payload) {
            state.orders_list = payload
        },
        orderListLoadingSwitch (state, payload) {
            state.orders_list_loading = payload
        },
        setPageQty (state, payload) {
            state.pageQty = payload
        },
        setOrdersOnPageQty (state, payload) {
            state.ordersOnPageQty = payload
        },
        setCurrentPage (state, payload) {
            state.currentPage = payload
        },
        setOrderAvailPagesBeforeCurrent (state, payload) {
            state.orderAvailPagesBeforeCurrent = payload
        },
        setOrderAvailPagesAfterCurrent (state, payload) {
            state.orderAvailPagesAfterCurrent = payload
        }
    },
    actions: {
        async loadOrdersList({commit}, params) {
            let page = 1
            let ordersOnPageQty = 10
            if (params.page) {
                page = params.page
            }
            if (params.ordersOnPageQty) {
                ordersOnPageQty = params.ordersOnPageQty
            }
            let authToken = params.authToken
            let url = `${backendPath}/api/v1/order/?page=${page}&count=${ordersOnPageQty}`
            commit('setOrdersOnPageQty', ordersOnPageQty)
            commit('orderListLoadingSwitch', true)
            await Axios({
                method: 'get',
                headers: {
                    "Authorization": `Token ${authToken}`
                },
                url: url
            }).then(response => {
                let pageQty = 1
                if (response.data.total % ordersOnPageQty > 0) {
                    pageQty = Math.floor(response.data.total/ordersOnPageQty) + 1
                } else {
                    pageQty = Math.floor(response.data.total/ordersOnPageQty)
                }
                commit('setPageQty', pageQty)
                commit('setCurrentPage', page)
                commit('loadOrdersList', response.data.data)
                let orderAvailPagesBeforeCurrent = []
                if (page <= 2) {
                    for (let i = 1; i < page; i++) {
                        orderAvailPagesBeforeCurrent.push(i)
                    }
                } else {
                    for (let i = (page-2); i < page; i++) {
                        orderAvailPagesBeforeCurrent.push(i)
                    }
                }
                orderAvailPagesBeforeCurrent = orderAvailPagesBeforeCurrent.sort((a, b) => {
                    return a - b
                })
                commit('setOrderAvailPagesBeforeCurrent', orderAvailPagesBeforeCurrent)
                let orderAvailPagesAfterCurrent = []
                if ((pageQty - page) <= 2) {
                    for (let i = (page+1); i <= pageQty; i++) {
                        orderAvailPagesAfterCurrent.push(i)
                    }
                } else {
                    for (let i = (page+1); i < (page+3); i++) {
                        orderAvailPagesAfterCurrent.push(i)
                    }
                }
                orderAvailPagesAfterCurrent = orderAvailPagesAfterCurrent.sort((a, b) => {
                    return a - b
                })
                commit('setOrderAvailPagesAfterCurrent', orderAvailPagesAfterCurrent)
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
                    "price": item.price,
                    "summ": (item.price*item.quantity).toFixed(2)
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