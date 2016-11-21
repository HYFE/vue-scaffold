import Vue from 'vue'

export default {
    getCitys() {
        return Vue.http.get('/city')
            .then(res => res.json(),
                res => console.error('error: ', res.status, res.statusText))
    }
}
