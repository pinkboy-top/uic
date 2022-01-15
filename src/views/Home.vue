<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="自定义按钮提示信息"/>
    <Tabbar/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Tabbar from '@/components/Tabbar.vue'


export default {
  name: 'Home',
  components: {
    HelloWorld,
    Tabbar
  }
}
</script>
