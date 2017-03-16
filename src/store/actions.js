import CityApi from 'api/city'

export default {
    getCitys(store) {
        console.log(store)
        CityApi.all().then(data => {
            window.__vue_citys = data.citys
            store.commit('citys', data.citys)
        })
    },
    deleteCity({ commit }, id) {
        commit('delCity', id)
    }
}
