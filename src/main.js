import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'

Vue.use(VueResource)

export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
