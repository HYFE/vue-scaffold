import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import Cache from './plugins/cache'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        citys: {}
    },
    mutations,
    actions,
    getters: {
        citysCount(state) {
            return Object.keys(state.citys).length
        }
    },
    plugins: [
        Cache
    ]
})
