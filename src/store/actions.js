import CityApi from 'api/city'
import Config from './config'
import Cache from 'src/util/cache'
import { city as cityType, COMMIT_ACTION } from './types'
import _ from 'lodash'

export default {
    getCitys({ dispatch }) {
        dispatch(COMMIT_ACTION, {
            type: cityType.SYNC_DATA,
            promise: () => CityApi.all().then(data => data.citys)
        })
    },
    deleteCity({ commit, state }, id) {
        commit(cityType.SYNC_DATA, _.omit(state.citys, [id]))
    },
    [COMMIT_ACTION]({ commit }, { type, promise }) {
        const module = type.split('/')[0]
        const cacheKey = Config[module] || ''
        const cacheData = Cache.get(cacheKey)
        if(!cacheData) {
            promise().then(data => commit(type, data))
        } else {
            commit(type, cacheData)
        }
    }
}
