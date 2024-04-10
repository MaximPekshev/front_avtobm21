import Axios from 'axios'
import {backendPath} from "@/main.js"

export default {
    state: {
        contracts: [],
        contracts_loading: false
    },
    getters: {
        contracts: state => {
            return state.contracts
        },
        contracts_loading: state => {
            return state.contracts_loading
        }
    },
    mutations: {
        contractsLoadingSwitch (state, payload) {
            state.contracts_loading = payload
        },
        loadContracts (state, payload) {
            state.contracts = payload
        }
    },
    actions: {
        async loadContracts ({commit}, authToken) {
            commit('contractsLoadingSwitch', true)
            let url = `${backendPath}/api/v1/order/contract/`
            await Axios({
                method: 'get',
                headers: {
                    "Authorization": `Token ${authToken}`,
                },
                url: url
            }).then((response) => {
                commit('loadContracts', response.data.data)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                commit('contractsLoadingSwitch', false)
            })
        },
        clearContracts({commit}, payload) {
            commit('loadContracts', payload)
        }
    }
}