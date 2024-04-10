import Axios from 'axios'
import {backendPath} from "@/main.js"

export default {
    state: {
        goods: [],
        goods_qty: 0,
        page_qty: 0,
        goods_on_page_qty: 0,
		goods_list_loading: false,
        current_page: 1,
        availablePagesBeforeCurrent: [],
        availablePagesAfterCurrent: [],
    },
    getters: {
        goods_list: state => {
            return state.goods;
        },
        goods_list_loading: state => {
            return state.goods_list_loading;
        },
        goods_qty: state => {
            return state.goods_qty;
        },
        page_qty: state => {
            return state.page_qty;
        },
        categoryName: state => {
            return state.category.name;
        },
        goods_on_page_qty: state => {
            return state.goods_on_page_qty;
        },
        current_page: state => {
            return state.current_page;
        },
        availablePagesBeforeCurrent: state => {
            return state.availablePagesBeforeCurrent;
        },
        availablePagesAfterCurrent: state => {
            return state.availablePagesAfterCurrent;
        }
    },
    mutations: {
        loadGoodsList (state, payload) {
            state.goods = payload
        },
        loadCategory (state, payload) {
            state.category = payload
        },
        goodsLoadingSwitch (state, payload) {
            state.goods_list_loading = payload
        },
        setGoodsQty (state, payload) {
            state.goods_qty = payload
        },
        setPageQty (state, payload) {
            state.page_qty = payload
        },
        setGoodsOnPageQty (state, payload) {
            state.goods_on_page_qty = payload
        },
        setCurrentPage (state, payload) {
            state.current_page = payload
        },
        setAvailablePagesBeforeCurrent (state, payload) {
            state.availablePagesBeforeCurrent = payload
        },
        setAvailablePagesAfterCurrent (state, payload) {
            state.availablePagesAfterCurrent = payload
        },
    },
    actions: {
        setAvailablePagesBeforeCurrent ({commit}, payload) {
            commit('setAvailablePagesBeforeCurrent', payload)
        },
        setAvailablePagesAfterCurrent ({commit}, payload) {
            commit('setAvailablePagesAfterCurrent', payload)
        },
        setCurrentPage ({commit}, payload) {
            commit('setCurrentPage', payload)
        },
        async getGoodsList ({commit}, params) {
            let page = 1
            let goodsQtyOnPage = 28
            let q = ''
            if (params.page) {
                page = params.page
            }
            if (params.goodsQtyOnPage) {
                goodsQtyOnPage = params.goodsQtyOnPage
            }
            if (params.q) {
                q = params.q
            }
            let url = `${backendPath}/api/v1/catalog/good`
            if (q) {
                url = url + `/?search=${q}&page=${page}&count=${goodsQtyOnPage}`
            } else {
                url = url + `/?page=${page}&count=${goodsQtyOnPage}`
            }
            commit('setGoodsOnPageQty', goodsQtyOnPage)
            commit('goodsLoadingSwitch', true)
            await Axios.get(url)
                .then((response) => {
                    let page_qty = 1
                    if (response.data.count % goodsQtyOnPage > 0) {
                        page_qty = Math.floor(response.data.count/goodsQtyOnPage) + 1
                    } else {
                        page_qty = Math.floor(response.data.count/goodsQtyOnPage)
                    }
                    commit('setPageQty', page_qty)
                    commit('setCurrentPage', page)
                    commit('setGoodsQty', response.data.count)
                    commit('loadGoodsList', response.data.data)
                    let availablePagesBeforeCurrent = []
                    if (page <= 2) {
                        for (let i = 1; i < page; i++) {
                            availablePagesBeforeCurrent.push(i)
                        }
                    } else {
                        for (let i = (page-2); i < page; i++) {
                            availablePagesBeforeCurrent.push(i)
                        }
                    }
                    availablePagesBeforeCurrent = availablePagesBeforeCurrent.sort(function(a, b) {
                        return a - b;
                    });
                    commit('setAvailablePagesBeforeCurrent', availablePagesBeforeCurrent)

                    let availablePagesAfterCurrent = []
                    if ((page_qty - page) <= 2) {
                        for (let i = (page+1); i <= page_qty; i++) {
                            availablePagesAfterCurrent.push(i)
                        }
                    } else {
                        for (let i = (page+1); i < (page+3); i++) {
                            availablePagesAfterCurrent.push(i)
                        }
                    }
                    availablePagesAfterCurrent = availablePagesAfterCurrent.sort(function(a, b) {
                        return a - b;
                    });
                    commit('setAvailablePagesAfterCurrent', availablePagesAfterCurrent)
                    setTimeout(()=>{
                        commit('goodsLoadingSwitch', false)
                    }, 300);
                })
                .catch(function(error){
                    console.log(error);
                });
        },
        async getGoodsListByCategory ({commit}, params) {
            let page = 1
            let goodsQtyOnPage = 28
            if (params.page) {
                page = params.page
            }
            if (params.goodsQtyOnPage) {
                goodsQtyOnPage = params.goodsQtyOnPage
            }
            commit('setGoodsOnPageQty', goodsQtyOnPage)
            let url = `${backendPath}/api/v1/catalog/good`
            url = url + `/?category_id=${params.category_id}&page=${page}&count=${goodsQtyOnPage}`
            commit('goodsLoadingSwitch', true)
            await Axios.get(url)
                .then((response) => {
                    let page_qty = 1
                    if (response.data.count % goodsQtyOnPage > 0) {
                        page_qty = Math.floor(response.data.count/28) + 1
                    } else {
                        page_qty = Math.floor(response.data.count/28)
                    }
                    commit('setPageQty', page_qty)
                    commit('setCurrentPage', page)
                    commit('setGoodsQty', response.data.count)
                    commit('loadGoodsList', response.data.data)
                    let availablePagesBeforeCurrent = []
                    if (page <= 2) {
                        for (let i = 1; i < page; i++) {
                            availablePagesBeforeCurrent.push(i)
                        }
                    } else {
                        for (let i = (page-2); i < page; i++) {
                            availablePagesBeforeCurrent.push(i)
                        }
                    }
                    availablePagesBeforeCurrent = availablePagesBeforeCurrent.sort(function(a, b) {
                        return a - b;
                    });
                    commit('setAvailablePagesBeforeCurrent', availablePagesBeforeCurrent)

                    let availablePagesAfterCurrent = []
                    if ((page_qty - page) <= 2) {
                        for (let i = (page+1); i <= page_qty; i++) {
                            availablePagesAfterCurrent.push(i)
                        }
                    } else {
                        for (let i = (page+1); i < (page+3); i++) {
                            availablePagesAfterCurrent.push(i)
                        }
                    }
                    availablePagesAfterCurrent = availablePagesAfterCurrent.sort(function(a, b) {
                        return a - b;
                    });
                    commit('setAvailablePagesAfterCurrent', availablePagesAfterCurrent)
                    setTimeout(()=>{
                        commit('goodsLoadingSwitch', false)
                    }, 300);
                })
                .catch(function(error){
                    console.log(error);
                });
        },
    }
}