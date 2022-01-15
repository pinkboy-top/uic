<template>
  <div class="login">
    <h1>This is an login page</h1>
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
