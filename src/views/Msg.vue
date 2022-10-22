<template>
  <div class="msg_info">

    <van-cell center title="返回" icon="close" is-link to="/msglist" value="返回" />

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
                <img style="width:4rm; height:4rm; border-radius:50%;" :src="imgUrl.imgUrl + item.bind_user_avatar">
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
                <img style="width:4rm; height:4rm; border-radius:50%;" :src="imgUrl.imgUrl + item.bind_user_avatar">
            </div>
            <div>
                <div class="right_triangle"></div>
                <span>{{item.m}}</span>
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
    let send_user_account = ref('');
    let accept_user_account = ref('');
    let send_user = ref('');
    let accept_user = ref('');
    let to_user_account = ref('');
    let post_user_avatar = ref('');
    let send_user_avatar = ref('');
    let accept_user_avatar = ref('');
    let exit_user = ref('');
    let chat_id = ref('');
    let uid = ref('');
    const axios = inject('axios');

    // 在组建中使用必须获取所有实例注册到全局组件中
    const wss = getCurrentInstance();

    // 提交事件
    const onSubmit = (values) => {

      if (values.msg == ''){
        Toast.fail('不允许发送空消息！');
      } else {

        list.value.push({"left": false, "m": values.msg, "bind_user_avatar": post_user_avatar});
        postData(values.msg);
        // 清空输入框
        msg.value = '';
        // 滚动到底部
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      }
    };

    const onLoad = () => {

      setTimeout(() => {

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        finished.value = true;

        // 获取聊天信息
        axios.post('/user/get_chat_info', {'chat_id': route.query.chat_id}).then(resp => {
          if (resp.data.code == 200){

            // 将需要的信息赋值
            uid = resp.data.data[0].uid;
            chat_id = route.query.chat_id;
            send_user = resp.data.data[0].send_user_id;
            accept_user = resp.data.data[0].accept_user_id;
            send_user_avatar = resp.data.data[0].send_user_avatar;
            accept_user_avatar = resp.data.data[0].accept_user_avatar;
            send_user_account = resp.data.data[0].send_user_account;
            accept_user_account = resp.data.data[0].accept_user_account;

          }else if (resp.data.code == -5){
            Toast.fail(resp.data.msg);
            this.redirect_login();
          }
        }).catch(err => {
            Toast.fail('发生错误!');
            console.log(err);
        });

        // 获取聊天内容
        axios.post('/user/get_msg_info', {'chat_id': route.query.chat_id}).then(resp => {
          if (resp.data.code == 200){
            let msg_list = resp.data.data
            for (let index = 0; index < msg_list.length; index++) {

                if (msg_list[index].bind_user_uid != uid){
                  let p_data = {"left": true, "m": msg_list[index].msg_content, "bind_user_avatar": msg_list[index].bind_user_avatar, "bind_user_uid": msg_list[index].bind_user_uid}
                  list.value.push(p_data);
                }
                else{
                  let p_data = {"left": false, "m": msg_list[index].msg_content, "bind_user_avatar": msg_list[index].bind_user_avatar, "bind_user_uid": msg_list[index].bind_user_uid}
                  list.value.push(p_data);
                }
            }
            
            document.documentElement.scrollTop = document.documentElement.scrollHeight;
          }else if (resp.data.code == -5){
            Toast.fail(resp.data.msg);
            this.redirect_login();
          }
        }).catch(err => {
            Toast.fail('发生错误!');
            console.log(err);
        });

      }, 1000);
    };

    // 获取服务器返回的数据
    wss.proxy.$socket.onmessage = (res) => {

        if (res.data) {
          let msg_list = JSON.parse(res.data)
          for (let index = 0; index < msg_list.length; index++) {
            // const element = array[index];
            list.value.push({"left": true, "m": msg_list[index].msg, "bind_user_uid": msg_list[index].bind_user_uid, "bind_user_avatar": msg_list[index].bind_user_avatar});
          }
          document.documentElement.scrollTop = document.documentElement.scrollHeight;
        }
    }

    const postData = (values) => {

        if (accept_user == uid) {
          to_user_account = send_user_account
          post_user_avatar = accept_user_avatar
        }else{
          
          to_user_account = accept_user_account
          post_user_avatar = send_user_avatar
        }

        // 发送数据到服务器
        let post_msg = {'msg': values, 'to_user_account': to_user_account, 'post_user_avatar': post_user_avatar, 'uid': uid, 'chat_id': chat_id}
        wss.proxy.$socket.sendObj(post_msg);

        // 获取服务器返回的数据
        wss.proxy.$socket.onmessage = (res) => {

            if (res.data) {
              let msg_list = JSON.parse(res.data)
              for (let index = 0; index < msg_list.length; index++) {
                // const element = array[index];
                list.value.push({"left": true, "m": msg_list[index].msg, "bind_user_uid": msg_list[index].bind_user_uid, "bind_user_avatar": msg_list[index].bind_user_avatar});
              }
              document.documentElement.scrollTop = document.documentElement.scrollHeight;
            }
        }
        
    }

    // 页面关闭的时候发送关闭链接
    window.onunload=function(){
      if (accept_user == uid) {
          exit_user = accept_user_account
        }else{
          
          exit_user = send_user_account
      }
      wss.proxy.$socket.sendObj({'exit_page': true, 'send_user': exit_user});
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
      accept_user,
      send_user_account,
      accept_user_account,
      to_user_account,
      post_user_avatar,
      send_user_avatar,
      accept_user_avatar,
      uid,
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
