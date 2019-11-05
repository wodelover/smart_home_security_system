// 导入路由器需要用到的包以及默认配置 npm install vue-router -S
import VueRouter from 'vue-router'
import Vue from 'vue'
import routers from './routers'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: routers
})