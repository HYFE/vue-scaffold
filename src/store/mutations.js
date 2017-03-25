// import _ from 'lodash'
import { city as cityType } from './types'

export default {
    [cityType.SYNC_DATA](state, data) {
        state.citys = data
    },
    // [cityType.REMOVE_ONE](state, id) {
    //     state.citys = _.omit(state.citys, [id])
    // }
}
