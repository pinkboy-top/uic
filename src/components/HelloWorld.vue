<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <van-button type="success" @click="message">{{ msg }}</van-button>
  </div>
</template>

<script>
import { Button, Toast } from 'vant'


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  methods: {
    message(){
      Toast({
        message: '自定义图片',
        icon: 'https://img.yzcdn.cn/vant/logo.png',
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
