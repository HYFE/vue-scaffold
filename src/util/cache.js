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
 * browserStorage
 */
const browserStorage = () => {
    const storage = __localStorage
    return {
        get: key => JSON.parse(storage.getItem(key)),
        save: (key, data) => storage.setItem(key, JSON.stringify(data)),
        remove: key => storage.removeItem(key),
        clear: () => storage.clear()
    }
}

/**
 * ramStorage
 */
const ramStorage = () => {
    const storage = new Map()
    return {
        get: key => storage.get(key),
        save: (key, data) => storage.set(key, data),
        remove: key => storage.delete(key),
        clear: () => storage.clear()
    }
}

/**
 * cacheStore fallback
 * 不支持 localStorage 时，回退 ramStorage
 */
const cacheStore = isSupported() ? browserStorage() : ramStorage()
export default cacheStore
