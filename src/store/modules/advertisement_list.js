import Axios from 'axios'
import {backendPath} from "@/main.js"

export default {
    state: {
        advertisements_list: [],
		advertisements_list_loading: false,
    },
    getters: {
        advertisementsList: state => {
            return state.advertisements_list
        },
        advertisementsListQty: state => {
            return state.advertisements_list.length
        },
        getAdvertisementsById: state => id => {
            return state.advertisements_list.find(advertisement => advertisement.id === id);
        },
        advertisementsListLoading: state => {
            return state.advertisements_list_loading
        }
    },
    mutations: {
        loadAdvertisementsList (state, payload) {
            state.advertisements_list = payload
        },
        advertisementsListLoadingSwitch (state, payload) {
            state.advertisements_list_loading = payload
        }
    },
    actions: {
        async loadAdvertisementsList ({commit}) {
            let url = `${backendPath}/api/v1/advertisement/`
            commit('advertisementsListLoadingSwitch', true)
            await Axios.get(url)
                .then((response) => {
                    commit('loadAdvertisementsList', response.data.data)
                    setTimeout(()=>{
                        commit('advertisementsListLoadingSwitch', false)
                    }, 300);
                })
                .catch(function(error){
                    console.log(error);
                });
        },
    }
}