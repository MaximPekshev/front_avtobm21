import Axios from 'axios'
import {backendPath} from "@/main.js"

export default {
    state: {
        goodInfo: [],
        goodsPrice: [],
		good_info_loading: false,
    },
    getters: {
        goodInfo: state => {
            return state.goodInfo
        },
        goodsName: state => {
            return state.goodInfo.name
        },
        goodsPrice: state => {
            return state.goodsPrice
        },
        good_info_loading: state => {
            return state.good_info_loading
        }
    },
    mutations: {
        loadGoodInfo (state, payload) {
            state.goodInfo = payload
        },
        loadGoodsPrice (state, payload) {
            state.goodsPrice = payload
        },
        goodLoadingSwitch (state, payload) {
            state.good_info_loading = payload
        }
    },
    actions: {
        loadGoodInfo ({commit}, id) {
            let url = `${backendPath}/api/v1/catalog/good/?id=${id}`
            commit('goodLoadingSwitch', true)
            Axios.get(url)
                .then((response) => {
                    commit('loadGoodInfo', response.data.data[0].good)
                    commit('loadGoodsPrice', response.data.data[0].price)
                    setTimeout(()=>{
                        commit('goodLoadingSwitch', false)
                    }, 50);
                })
                .catch(function(error){
                    console.log(error)
                });
        },
    }
}