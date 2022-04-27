import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'//引入axios
import ElementUI from 'element-ui';
import * as echarts from "echarts" 
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.css';
Vue.prototype.$axios = axios;//把axios挂载到vue上
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
