import Vue from 'vue'
import VueRouter from 'vue-router'
import hello from './map/hello'
import tree from './map/tree'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        ...hello,
        ...tree
    ]
})
