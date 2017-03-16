import _ from 'lodash'

export default {
    citys(state, data) {
        state.citys = data
    },
    delCity(state, id) {
        state.citys = _.omit(state.citys, [id])
    }
}
