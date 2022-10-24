<template>

    <div>
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
                    <!-- <van-col span="8">         
                        <h4>账号:{{this.account}}</h4>
                    </van-col> -->
                </van-row>
            </div>
        </div>
            
        <div id="info">
            <van-cell-group>
                <van-field
                    v-model="account"
                    label="账号"
                    left-icon="closed-eye"
                    right-icon="guide-o"
                    readonly
                />
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

        <div id="bt">
            <van-button round block color="#7232dd" @click="createChat(account)">
                开始聊天
            </van-button>
        </div>

    </div>

    
    
</template>


<script>
import imgUrl from '@/global';
import { Toast, Empty, Cell, CellGroup, Image, Col, Row, Field, Button } from 'vant';



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
    name: 'FriendInfo',
    components: {
        [Button.name]: Button,
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

        To_friend_info(fid) {
            Toast(fid);
        },

        // 创建聊天
        createChat(to_account) {
            Toast.fail(to_account);
            this.axios.post('/user/create_chat', {'to_user_account': to_account})
            .then(resp => {

                if (resp.data.code == 200){
                    this.$router.push('/msg/?chat_id=' + resp.data.chat_id);
                }
                console.log(resp);
            }).catch(eer => {
                console.log(eer);
                Toast.fail("报错啦");
            });
        }
    },
    created(){
        this.axios.post('/user/get_friend_info', {'friend_uid': this.$route.query.fid})
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

#bt {
    margin-top: 100px;
    padding: 20px;
}
</style>
