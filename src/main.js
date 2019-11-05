import Vue from 'vue'
import App from './App.vue'

// 导入 element-ui 界面
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入路由器配置项
import router from '@/router/index'
// 跳转每个页面之前验证是否进行已经进行登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') { // 如果是首页
      next()
  } else { // 如果是其它页面
      // 获取登陆成功的session
      var user = sessionStorage.getItem('user')
      if (to.meta.auth) { // 如果跳转的页面需要进行登陆验证
          if (user) { // 如果登陆成功
              next()
          } else {
              next('/login')
          }
      } else {
          next()
      }
  }

})

// 引入http数据传输模块,并导入所有方法
import * as http from './requests/index'
Vue.prototype.$http = http

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  // 将路由器注册为全局对象
  router,
  render: h => h(App),
}).$mount('#app')
