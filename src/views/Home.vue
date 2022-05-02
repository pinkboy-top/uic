<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <van-cell title="发个动态" icon="add-o" is-link to="addnews" value="走你" />
    <van-empty image="error" description="啥也没有" />
    <van-skeleton title avatar :row="3" />
    <Tabbar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from '@/components/Tabbar.vue'
import { Toast, Empty, Skeleton, Cell } from 'vant';

export default {
  name: 'Home',
  components: {
    Tabbar,
    [Empty.name]: Empty,
    [Skeleton.name]: Skeleton,
    [Cell.name]: Cell
  }
}
</script>
