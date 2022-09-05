<template>
    <div class="user">
        <div id="bg">
            <div id="header">
                <van-row gutter="22">
                    <van-col span="8">
                        <van-image
                            round
                            width="5rem"
                            height="5rem"
                            fit="cover"
                            :src="this.avatar"
                        />
                    </van-col>
                    <van-col span="10">
                        <h2>{{this.nickname}}</h2>
                    </van-col>
                    <van-col span="8">         
                        <h4>{{this.account}}</h4>
                    </van-col>
                </van-row>
            </div>
        </div>
            
        <div id="info">
            <van-cell-group>
                <van-field
                    v-model="gender"
                    label="性别"
                    left-icon="closed-eye"
                    right-icon="guide-o"
                    readonly
                />
                <van-field
                    v-model="summary"
                    label="签名"
                    left-icon="like-o"
                    right-icon="star-o"
                    readonly 
                />
                <van-field
                    v-model="birthday"
                    label="生日"
                    left-icon="birthday-cake-o"
                    right-icon="star-o"
                    readonly 
                />
            </van-cell-group>
        </div>
        <Tabbar/>
  </div>
</template>


<script>
import Tabbar from '@/components/Tabbar.vue';
import imgUrl from '@/global';
import { Toast, Empty, Cell, CellGroup, Image, Col, Row, Field } from 'vant';


export default {
    data ()  {
        return{
            avatar: '',
            account: '',
            nickname: '',
            summary: '',
            gender: '',
            birthday: '',
            create_date: ''
        }
    },
    name: 'User',
    components: {
        Tabbar,
        [Toast.name]: Toast,
        [Empty.name]: Empty,
        [Cell.name]: Cell,
        [Image.name]: Image,
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Col.name]: Col,
        [Row.name]: Row
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
                this.avatar = imgUrl.imgUrl + resp.data.data.avatar
                this.account = resp.data.data.account
                this.nickname = resp.data.data.nickname
                this.summary = resp.data.data.summary
                this.gender = resp.data.data.gender
                this.birthday = resp.data.data.birthday
                this.create_date = resp.data.data.create_date
                // Toast({
                //     message: this.avatar,
                //     icon: 'like-o',
                // });
            } else if (resp.data.code == -10){
                Toast.fail(resp.data.msg);
            } else if (resp.data.code == -5){
                Toast.fail(resp.data.msg);
                // 重定向到登录
                this.redirect_login();
            }
        }).catch(err => {
            Toast.fail('发生错误!');
            console.log(err);
        });
    }
}
</script>


<style scoped>

#bg {
    background-image: url("../assets/bg.jpg");
}

#header {
    padding-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    color: #2c3e50;
}

/* #info {
    margin-top: 10px;
    border-radius: 15px;
    background: #e6e6e6;
    padding: 5px;
} */
</style>
