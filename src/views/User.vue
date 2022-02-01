<template>
    <div class="user">
        <h1>This is an user page</h1>
        <Tabbar/>
  </div>
</template>


<script>
import Tabbar from '@/components/Tabbar.vue';
import { Toast } from 'vant';


export default {
  name: 'User',
  components: {
    Tabbar,
    [Toast.name]: Toast,
  },
  methods: {
      redirect_login() {
            this.$router.push('login');
    },
  },
  created(){
      this.axios.post('/user/user_info')
        .then(resp => {
            if (resp.data.code == 200){
                Toast({
                    message: '登录成功',
                    icon: 'like-o',
                });
            } else if (resp.data.code == -10){
                Toast.fail(resp.data.msg);
            } else if (resp.data.code == -5){
                Toast.fail(resp.data.msg);
                this.redirect_login();
            }
        }).catch(err => {
            Toast.fail('发生错误!');
            console.log(err);
        });
    }
}
</script>
