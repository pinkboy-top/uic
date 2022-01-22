<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Tabbar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from '@/components/Tabbar.vue'


export default {
  name: 'Home',
  components: {
    Tabbar
  }
}
</script>
