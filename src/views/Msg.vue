<template>
    <div class="msg">
        <h1>This is an msg page</h1>
        <van-empty image="error" description="啥也没有" />
        <Tabbar/>
  </div>
</template>


<script>
import Tabbar from '@/components/Tabbar.vue';
import { Toast, Empty } from 'vant';


export default {
  name: 'Msg',
  components: {
    Tabbar,
    [Empty.name]: Empty,
  }
}
</script>