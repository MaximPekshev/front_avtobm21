import Axios from 'axios'
import {backendPath} from "@/main.js"

export default {
    state: {
        contracts: [],
        actualContract: [],
        actualCustomer: [],
        contracts_loading: false
    },
    getters: {
        contracts: state => {
            return state.contracts
        },
        getContractById: state => id => {
            return state.contracts.find(contract => contract.id === id)
        },
        actualContract: state => {
            return state.actualContract
        },
        actualCustomer: state => {
            return state.actualCustomer
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
        },
        loadActualContract (state, payload) {
            state.actualContract = payload
        },
        loadActualCustomer (state, payload) {
            state.actualCustomer = payload
        }
    },
    actions: {
        async loadContracts ({commit}, params) {
            let authToken = params.authToken
            let id = params.id
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
                if (id) {
                    let actualContract = response.data.data.find(contract => contract.id === id)
                    commit('loadActualContract', actualContract)
                    commit('loadActualCustomer', actualContract.customer)
                } else {
                    let actualContract = response.data.data[0]
                    commit('loadActualContract', actualContract)
                    commit('loadActualCustomer', actualContract.customer)
                }
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