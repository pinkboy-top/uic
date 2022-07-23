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


// 创建vueApp对象
const app = createApp(App);
/* 挂载全局对象 start */

// 设置封装的网络请求
app.use(VueAxios, axios);

// 图片预览
app.use(VueViewer);


app.use(store).use(router).use(VueWechatTitle).mount('#app');
