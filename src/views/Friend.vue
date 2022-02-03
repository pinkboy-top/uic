<template>
    <div class="friend">
        <h1>This is an friend page</h1>
        <van-empty image="error" description="啥也没有" />
        <Tabbar/>
  </div>
</template>


<script>
import Tabbar from '@/components/Tabbar.vue';
import { Toast, Empty } from 'vant';


export default {
  name: 'Friend',
  components: {
    Tabbar,
    [Empty.name]: Empty,
  }
}
</script>