<template>
    <div id="nav">
        <van-nav-bar title="标题" left-text="返回" left-arrow>
          <template #right>
            <van-icon name="search" size="18" />
          </template>
        </van-nav-bar>
    </div>
    <div class="tabbar">
      <van-tabbar v-model="active" active-color="#cc66ff" inactive-color="#99d6ff">
        <van-tabbar-item name="home" to="/" icon="chat-o">消息</van-tabbar-item>
        <van-tabbar-item name="login" to="/about" icon="like-o">动态</van-tabbar-item>
        <van-tabbar-item name="friends" to="/login" icon="friends-o">好友</van-tabbar-item>
        <van-tabbar-item name="setting" icon="setting-o">个人中心</van-tabbar-item>
        <van-tabbar-item name="register" to="/register" icon="setting-o">注册账号</van-tabbar-item>
      </van-tabbar>
    </div>
    <router-view v-wechat-title='$route.meta.title'/>
</template>


<script>
import { ref } from 'vue';
import { Tabbar, TabbarItem, NavBar  } from 'vant'

export default {
  setup() {
    const active = ref(0);
    return { active };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [NavBar.name]: NavBar,
  },
};

</script>
