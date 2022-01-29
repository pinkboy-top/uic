import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "首页",
      content: '首页页面',
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: "关于",
      content: '首页页面',
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
})
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    console.log(token)
    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
