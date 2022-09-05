import Axios from 'axios';
import router from './router';
import { Toast } from 'vant';

const axios = Axios.create({
    
headers: {
    'Content-Type': 'application/json'
  }, 
    timeout: 60000, // 超时
    baseURL: 'https://127.0.0.1:80/api/v1' // 请求接口地址，这里使用本项目地址，因为我们是前后端分离，后面需要在vue.config.js里面配置代理，实际请求得地址不是这个。
});


// http request 拦截器
axios.interceptors.request.use(
    config => {
      if (localStorage.token) { //判断token是否存在
        config.headers.Authorization = localStorage.getItem('token'); //将token设置成请求头
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  
  // http response 拦截器
  axios.interceptors.response.use(
    response => {
      if (response.data.code == -10) {
        router.replace('/login');
        Toast.fail('登录过期');
      };
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
export default axios
