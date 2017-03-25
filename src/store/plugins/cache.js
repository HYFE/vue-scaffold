import Cache from 'src/util/cache'
import Config from '../config'

export default store => {
    store.subscribe(({ type, payload }, state) => {
        const module = type.split('/')[0]
        const cacheKey = Config[module]
        if (cacheKey) {
            Cache.save(cacheKey, payload)
        }
    })
}
