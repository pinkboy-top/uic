<template>
    <div id="login">
        <div id="login_img"><van-image
            round
            width="7rem"
            height="7rem"
            src="https://img.yzcdn.cn/vant/logo.png"/>
        </div>
        <van-form @submit="onSubmit">
          <van-field
              v-model="account"
              name="account"
              left-icon="contact"
              label="账号"
              placeholder="账号"
              :rules="[{ required: true, message: '请填写账号' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="password"
              left-icon="passed"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
              <van-button round block color="#7232dd" native-type="submit">
              登录
              </van-button>
          </div>
        </van-form>
        <van-divider
            :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '10 25px' }">
            或者
        </van-divider>
        <van-cell title="注册账号" is-link to="register" />
    </div>
</template>

<script>
import { Toast, Image, Form, Field, Button, Cell, Divider } from 'vant';


export default {
    data() {
        return {
          account: '',
          password: '',
      };
    },
    // 引入的vant组件
    components: {
        [Button.name]: Button,
        [Toast.name]: Toast,
        [Image.name]: Image,
        [Form.name]: Form,
        [Field.name]: Field,
        [Cell.name]: Cell,
        [Divider.name]: Divider

    },
    methods: {
        router_registered(){
            this.$router.push('register');
        },
        router_home(){
            this.$router.push('/');
        },
        onSubmit(values){
            this.axios.post('/user/login', values)
        .then(resp => {
            if (resp.data.code == 200){
                Toast({
                    message: '登录成功',
                    icon: 'like-o',
                });
              // 登录成功保存token
              localStorage.setItem('token',resp.data.data.token);
              setTimeout(this.router_home, 3000);
            } else if (resp.data.code == -10){
                Toast.fail(resp.data.msg);
            } else if (resp.data.code == -5){
                Toast.fail(resp.data.msg);
                setTimeout(this.router_registered, 3000);
            }
            console.log(resp);
        }).catch(err => {
            Toast.fail('发生错误!');
            console.log(err);
        })
        console.log('data', values);
        },
    },
};
</script>

<style scoped>
#login_img {
        margin-top: 20px;
        margin-bottom: 10px;
}
#login {
        text-align: center;
}
</style>