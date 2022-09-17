<template>
  <div class="msg_info">

    <van-cell center title="返回" icon="close" is-link to="/msglist" value="返回" />
    <img style="width:4rm; height:4rm; border-radius:50%;" :src="send_user_avatar">

    <van-form @submit="onSubmit">

    <van-list
      v-model:loading="loading"
      :finished="finished"
      @load="onLoad"
      >
      
        <template v-for="item in list" :key="item">
          <div v-if="item.left == true">
            <!-- Left -->
            <div class="sender">
              <div>
                <img style="width:4rm; height:4rm; border-radius:50%;" :src="accept_user_avatar">
              </div>
            <div>
              <div class="left_triangle"></div>
              <span> {{item.m}}</span>
            </div>
            </div>
          </div>

          <div v-else>
            <!-- Right -->
            <div class="receiver">
            <div>
                <img style="width:4rm; height:4rm; border-radius:50%;" :src="send_user_avatar">
            </div>
            <div>
                <div class="right_triangle"></div>
                <span>{{send_user_avatar}}</span>
                <span> {{item.m}}</span>
            </div>
            </div>
          </div>
        </template>

      
    </van-list>

    <div class="footer">
        <van-field
          v-model="msg"
          name="msg"
          autosize
          rows="2"
          maxlength="200"
          clearable
          left-icon="smile-o"
          label="发送内容"
          placeholder="请输入:"
          >
          <template #button>
            <van-button size="small" round type="success" native-type="submit">发送信息</van-button>
          </template>
        </van-field>
    </div>
    
    </van-form>
</div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import { Form, Field, CellGroup, Cell, Toast, List, Button, Icon} from 'vant';
import { useRoute } from "vue-router";
import imgUrl from '@/global';
import { inject } from 'vue';


export default {

  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [List.name]: List,
    [Button.name]: Button,
    [Icon.name]: Icon
  },

  setup() {
    const msg = ref('');
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const route = useRoute();
    let send_user = ref('');
    let to_user = ref('');
    let send_user_avatar = ref('');
    let accept_user_avatar = ref('');
    let chat_id = ref('');
    const axios = inject('axios');

    // 在组建中使用必须获取所有实例注册到全局组件中
    const wss = getCurrentInstance();

    // 获取页面高度函数
    const getScroll = () => {
      return {
        top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop  || 0,
        left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0
      }
    }

    // 提交事件
    const onSubmit = (values) => {
      console.log('submit', values);
      if (values.msg == ''){
        Toast.fail('不允许发送空消息！');
      } else {
        list.value.push({"left": false, "m": values.msg});
        postData(values.msg);
        // 清空输入框
        msg.value = '';
        // 滚动到底部
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      }
    };

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {

        // list.value.push({"left": true, "m": "欢迎使用在线聊天"});
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        finished.value = true;

        // 获取聊天详情
        axios.post('/user/get_chat_info', route.query).then(resp => {
          if (resp.data.code == 200){

            // 将需要的信息赋值
            chat_id = route.query.chat_id;
            send_user = resp.data.data[0].send_user_account;
            to_user = resp.data.data[0].accept_user_account;
            send_user_avatar = imgUrl.imgUrl + resp.data.data[0].send_user_avatar;
            accept_user_avatar = imgUrl.imgUrl + resp.data.data[0].accept_user_avatar;

          }else if (resp.data.code == -5){
            Toast.fail(resp.data.msg);
            // 重定向到登录
            this.redirect_login();
          }
        }).catch(err => {
            Toast.fail('发生错误!');
            console.log(err);
        });

        wss.proxy.$socket.sendObj({'open_page': true, 'send_user': send_user});
        // 获取服务器返回的数据
        wss.proxy.$socket.onmessage = (res) => {
          console.log(res.data)
          if (res.data) {
            let msg_list = JSON.parse(res.data)
            for (let index = 0; index < msg_list.length; index++) {
              // const element = array[index];
              list.value.push({"left": true, "m": msg_list[index].msg});
            }
          }
        }
      }, 1000);
    };

    const postData = (values) => {
        // 发送数据到服务器
        wss.proxy.$socket.sendObj({'msg': values, 'to_user': to_user, 'send_user': send_user, 'chat_id': chat_id});

        // 获取服务器返回的数据
        wss.proxy.$socket.onmessage = (res) => {
            console.log(res.data)
            if (res.data) {
              let msg_list = JSON.parse(res.data)
              for (let index = 0; index < msg_list.length; index++) {
                // const element = array[index];
                list.value.push({"left": true, "m": msg_list[index].msg});
              }
            }
        }
    }

    // 页面关闭的时候发送关闭链接
    window.onunload=function(){
      wss.proxy.$socket.sendObj({'exit_page': true, 'send_user': send_user});
    };


    return {
      msg,
      onSubmit,
      list,
      onLoad,
      loading,
      finished,
      wss,
      postData,
      chat_id,
      send_user,
      to_user,
      send_user_avatar,
      accept_user_avatar,
      imgUrl,
      axios
    };
  },
};
</script>

<style>

:root {
  --van-field-label-width: 5rem;
  --van-cell-vertical-padding: 5px;
  --van-cell-horizontal-padding: 5px;
}
.footer{
  position: fixed;
  bottom: 0;
  height: 3rem;
}
.msg_info{
  /* min-height: 50px; */
  /* 解决底部遮挡问题 */
  margin-left: 5px;
  margin-top: 5px;
  margin-right: 5px;
  padding-bottom: 10rem;
}

.sender{
  clear:both;
  /* height: 4rem; */
}
.sender div:nth-of-type(1){
  float: left;
}
.sender div:nth-of-type(2){
  background-color: aquamarine;
  float: left;
  margin: 0 20px 10px 15px;
  padding: 10px 10px 10px 0px;
  border-radius:7px;
}

.receiver div:first-child img,
.sender div:first-child img{
  width:50px;
  height: 50px;
}

.receiver{
  clear:both;
  /* height: 4rem; */
}
.receiver div:nth-child(1){
  float: right;
}
.receiver div:nth-of-type(2){
  float:right;
  background-color: gold;
  margin: 0 10px 10px 20px;
  padding: 10px 0px 10px 10px;
  border-radius:7px;
}

.left_triangle{
  height: 0px;  
  width:0px;  
  border-width:8px;  
  border-style:solid;  
  border-color:transparent aquamarine transparent transparent;  
  position: relative;
  left:-16px;
  top:3px;
}

.right_triangle{
  height: 0px;  
  width:0px;  
  border-width:8px;  
  border-style:solid;  
  border-color:transparent transparent transparent gold;  
  position: relative;
  right:-16px;
  top:3px;
}

</style>
