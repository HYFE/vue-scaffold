const get = key => JSON.parse(localStorage.getItem(key))
const save = (key, data) => localStorage.setItem(key, JSON.stringify(data))

export default {
    get,
    save
}
