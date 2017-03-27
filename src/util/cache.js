/**
 * localStorage
 */
const __localStorage = window.localStorage

/**
 * 检测是否支持 localStorage
 */
const isSupported = () => {
    const key = '__EPM_TEST_SUPPORTED__'
    try {
        __localStorage.setItem(key, Date.now())
        __localStorage.removeItem(key)
        return true
    } catch (error) {
        return false
    }
}

/**
 * 封装 browserStorage
 */
const browserStorage = () => {
    const storage = __localStorage
    return {
        get: key => JSON.parse(storage.getItem(key)),
        save: (key, data) => storage.setItem(key, JSON.stringify(data))
    }
}

/**
 * ramStorage
 */
const ramStorage = () => {
    const storage = {}
    return {
        get: key => storage[key],
        save: (key, data) => {
            storage[key] = data
        },
    }
}

/**
 * 不支持 localStorage 时，回退 ramStorage
 */
const cacheStore = isSupported() ? browserStorage() : ramStorage()
export default cacheStore
