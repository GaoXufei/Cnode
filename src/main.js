// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Icon from 'vue-svg-icon/Icon'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './vuex/store'

Vue.prototype.$http = axios;
Vue.use(ElementUI);

Vue.config.productionTip = false ;// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.component('icon',Icon);

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
