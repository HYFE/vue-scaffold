import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './view/Hello'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', component: Hello }
    ]
})
