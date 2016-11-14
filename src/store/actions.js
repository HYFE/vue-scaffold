import API from '../api'

export default {
    getCitys(store) {
        API.getCitys().then(data => {
            store.commit('CITYS', data.citys)
        })
    }
}
