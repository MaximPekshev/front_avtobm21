import Axios from 'axios'
import {backendPath} from "@/main.js"

export default {
    state: {
        order: [],
        order_info_loading: false,
    },
    getters: {
        order: state => {
            return state.order
        },
        orderAmount: state => {
            if (state.order.items.length > 0) {
                return state.order.items.reduce((acc,item) => acc += (item.quantity*item.price), 0)
            } else {
                return 0
            }
        },
        order_info_loading: state => {
            return state.order_info_loading
        }
    },
    mutations: {
        loadOrderInfo (state, payload) {
            state.order = payload
        },
        orderLoadingSwitch (state, payload) {
            state.order_info_loading = payload
        }
    },
    actions: {
        async loadOrderInfo ({commit}, params) {
            let id = params.id
            let authToken = params.authToken
            let url = `${backendPath}/api/v1/order/?id=${id}`
            commit('orderLoadingSwitch', true)
            await Axios({
                method: 'get',
                headers: {
                    "Authorization": `Token ${authToken}`
                },
                url: url
            }).then(response => {
                commit('loadOrderInfo', response.data.data[0])
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                setTimeout(()=>{
                    commit('orderLoadingSwitch', false)
                }, 300)
            })
        }
    }
}