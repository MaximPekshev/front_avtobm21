import Axios from 'axios'

export default {
    state: {
        good: [],
		good_info_loading: false,
    },
    getters: {
        good: state => {
            return state.good;
        },
        goodsName: state => {
            return state.good.name;
        },
        good_info_loading: state => {
            return state.good_info_loading;
        }
    },
    mutations: {
        loadGoodInfo (state, payload) {
            state.good = payload
        },
        goodLoadingSwitch (state, payload) {
            state.good_info_loading = payload
        }
    },
    actions: {
        async loadGoodInfo ({commit}, id) {
            let url = `https://back.avtobm21.ru/api/v1/catalog/good/?id=${id}`
            commit('goodLoadingSwitch', true)
            await Axios.get(url)
                .then((response) => {
                    commit('loadGoodInfo', response.data.data[0])
                    setTimeout(()=>{
                        commit('goodLoadingSwitch', false)
                    }, 300);
                })
                .catch(function(error){
                    console.log(error);
                });
        },
    }
}