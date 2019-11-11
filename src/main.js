// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Http from './util/request'
import '../static/css/main.css'
import x2js from 'x2js' // xml数据处理插件
import '@/assets/iconfont/iconfont.css'
import Print from '../static/js/print' // 引入附件的js文件
Vue.use(Print) // 注册

Vue.config.productionTip = false
Vue.prototype.Http = Http
Vue.prototype.$x2js = new x2js() // 创建x2js对象，挂到vue原型上

Vue.use(ElementUI)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
