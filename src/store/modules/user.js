import Axios from 'axios'

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
            let url = `https://back.avtobm21.ru/auth/get-user-info/`
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
                console.log(error);
            }).finally(() => {
                commit('userInfoLoadingSwitch', false)
            })
        },
        cleanUserInfo({commit}, payload) {
            commit('loadUserInfo', payload)
        }
    }
}