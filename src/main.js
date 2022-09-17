import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 动态修改页面标题
import VueWechatTitle from 'vue-wechat-title';
// 引入封装的axios
import axios from '@/https';
import VueAxios from 'vue-axios';
// 新增图片预览库
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
// 使用websocket
import VueNativeSock from "vue-native-websocket-vue3"
import { ConfigProvider } from 'vant';


// 创建vueApp对象
const app = createApp(App);
/* 挂载全局对象 start */

// 设置封装的网络请求
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

// 图片预览
app.use(VueViewer);

app.use(ConfigProvider);

// 连接websocket
if (localStorage.token) {
  app.use(VueNativeSock,
    "ws://127.0.0.1:6868/token=" + localStorage.getItem('token'),
    {
      // 数据发送/接收使用使用json
      format: "json",
      // 开启自动重连
      reconnection: true,
      // 尝试重连的次数
      reconnectionAttempts: 5,
      // 重连间隔时间
      reconnectionDelay: 3000
    });
}

app.use(store).use(router).use(VueWechatTitle).mount('#app');
