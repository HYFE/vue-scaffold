import CityApi from 'api/city'

export default {
    getCitys(store) {
        CityApi.all().then(data => {
            store.commit('citys', data.citys)
        })
    },
    deleteCity({ commit }, id) {
        commit('delCity', id)
    }
}
