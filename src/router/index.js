import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "动态",
      content: '动态首页',
      requireAuth: true
    },
  },
  {
    path: '/addnews',
    name: 'AddNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddNews.vue'),
    meta: {
      title: "发布动态",
      content: '发布动态',
      requireAuth: true
    },
  },
  {
    path: '/msg',
    name: 'Msg',
    component: () => import(/* webpackChunkName: "about" */ '../views/Msg.vue'),
    meta: {
      title: "消息中心",
      content: '消息页面',
      requireAuth: true
    },
  },
  {
    path: '/friend',
    name: 'Friend',

    component: () => import(/* webpackChunkName: "about" */ '../views/Friend.vue'),
    meta: {
      title: "好友中心",
      content: '好友详情页面',
      requireAuth: true
    }
  },
  {
    path: '/addfriend',
    name: 'AddFriend',

    component: () => import(/* webpackChunkName: "about" */ '../views/AddFriend.vue'),
    meta: {
      title: "添加好友",
      content: '添加好友页面',
      requireAuth: true
    }
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
    meta: {
      title: "用户中心",
      content: '用户详情页面',
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      title: "登录",
      content: '首页页面',
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: {
      title: "注册",
      content: '注册页面',
    }
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // 路由模式换成本地模式,不然打包后打开index会找不到路径
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.token) {  // 获取当前的token是否存在
      // console.log("token存在")
      next();
    } else {
      // console.log("token不存在")
      next({
        path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      });
    }
  }
  else { // 如果不需要权限校验，直接进入路由界面
    next();
  }
});
export default router
