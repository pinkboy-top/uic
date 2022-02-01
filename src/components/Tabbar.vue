<template>
    <div class="tabbar">
      <van-tabbar v-model="active" active-color="#cc66ff" inactive-color="#99d6ff" route>
        <van-tabbar-item name="home" replace to="/" icon="like-o">动态列表</van-tabbar-item>
        <van-tabbar-item name="msg" replace to="/msg" icon="chat-o">消息列表</van-tabbar-item>
        <van-tabbar-item name="friend" replace to="/friend" icon="friends-o">好友中心</van-tabbar-item>
        <van-tabbar-item name="user" replace to="/user" icon="setting-o">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
</template>


<script>
import { ref } from 'vue';
import { Tabbar, TabbarItem, NavBar, Icon  } from 'vant'

export default {
  setup() {
    const active = ref(0);
    return { active };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
};

</script>
