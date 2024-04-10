import Axios from 'axios'
import {backendPath} from "@/main.js"

export default {
    state: {
        user: {},
        user_token: "",
		user_info_loading: false,
    },
    getters: {
        user: state => {
            if (Object.keys(state.user).length === 0) {
                return ''
            } else {
                return state.user
            }
        },
        user_token: state => {
            return state.user_token
        },
		user_info_loading: state => {
            return state.user_info_loading
        },
    },
    mutations: {
        userInfoLoadingSwitch (state, payload) {
            state.user_info_loading = payload
        },
        setUserToken (state, payload) {
            state.user_token = payload
        },
        loadUserInfo (state, payload) {
            state.user = payload
        }
    },
    actions: {
        setUserToken ({commit}, payload) {
            commit('setUserToken', payload)
        },
        loadUserInfo ({commit}, authToken) {
            commit('userInfoLoadingSwitch', true)
            let url = `${backendPath}/auth/get-user-info/`
            Axios({
                method: 'get',
                headers: {
                    "Authorization": `Token ${authToken}`,
                },
                url: url,
            }).then((response) => {
                if (response.data.data[0]) {
                    commit('loadUserInfo', response.data.data[0])
                } else {
                    commit('setUserToken', "")
                }
            }).catch(function(error){
                if (error.status === 401) {
                    commit('setUserToken', "")
                }
                console.log(error)
            }).finally(() => {
                commit('userInfoLoadingSwitch', false)
            })
        },
        clearUserInfo({commit}, payload) {
            commit('loadUserInfo', payload)
        }
    }
}