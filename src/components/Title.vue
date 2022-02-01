<template>
    <div id="title">
        <van-nav-bar title="标题" left-text="返回" left-arrow>
          <template #right>
            <van-icon name="search" size="18" />
          </template>
        </van-nav-bar>
    </div>
</template>


<script>
import { Tabbar, Icon  } from 'vant'

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [Icon.name]: Icon
  },
};

</script>