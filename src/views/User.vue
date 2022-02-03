<template>
    <div class="user">
        <van-cell-group inset>
            <van-cell title="单元格" value="内容" size="large" />
            <van-cell title="单元格" value="内容" size="large" label="描述信息" />
        </van-cell-group>
        <van-empty image="error" description="啥也没有" />
                <div id="header">
            <van-image
                round
                width="5rem"
                height="5rem"
                :src="this.avatar"
            />
        </div>
        <div id="info">
            <van-list
            v-model="loading"
            :finished="finished"
            @load="load_data"
            >
            </van-list>
            <van-cell title="账号" v-model="account" icon="user-circle-o">
            </van-cell>
            <div class="van-hairline--top">
                <van-divider
                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
                >
                你是最幸运的
                </van-divider>
            </div>
            <van-cell title="昵称" v-model="nickname" icon="smile-o">
            </van-cell>
            <van-cell title="签名" v-model="signature" icon="more-o">
            </van-cell>
        </div>
        <Tabbar/>
  </div>
</template>


<script>
import Tabbar from '@/components/Tabbar.vue';
import { Toast, Empty, Cell, CellGroup } from 'vant';


export default {
    data ()  {
        return{
            avatar: '',
            account: '',
            nickname: '',
            signature: '',
        }
    },
  name: 'User',
  components: {
    Tabbar,
    [Toast.name]: Toast,
    [Empty.name]: Empty,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
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
