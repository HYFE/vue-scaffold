import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
    getCitys() {
        return Vue.http.get('/city')
            .then(res => res.json(),
                res => console.error('error: ', res.status, res.statusText))
    }
}
