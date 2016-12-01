import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './view/Hello'
import Tree from './view/Tree'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', component: Hello },
        { path: '/tree', component: Tree }
    ]
})
