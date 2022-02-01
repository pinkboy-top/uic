<template>
    <div class="msg">
        <h1>This is an msg page</h1>
        <Tabbar/>
  </div>
</template>


<script>
import Tabbar from '@/components/Tabbar.vue';


export default {
  name: 'Msg',
  components: {
    Tabbar
  }
}
</script>