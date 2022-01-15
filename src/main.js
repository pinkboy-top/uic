import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 动态修改页面标题
import VueWechatTitle from 'vue-wechat-title'
//引入axios发送网络请求
import Axios from 'axios'


createApp(App).use(store).use(router).use(VueWechatTitle).mount('#app')
