import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        citys: {}
    },
    mutations,
    actions,
    getters: {
        citys(state) {
            return state.citys
        }
    },
    modules: {}
})
