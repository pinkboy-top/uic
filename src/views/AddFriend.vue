<template>
    <div class="friend">
        
        <form action="/">
          <van-search
            v-model="account"
            shape="round"
            placeholder="请输入昵称或账号"
            @search="onSearch"
          />
        </form>

        <div v-if="friend !=''">
            <div class="tip">
            <span>搜索列表</span>
            </div>
            <div class="item" v-for="item in friend" :key="item.uid">
                <img class="face" :src="item.avatar">
                <div class="des">
                    <div class="nickName"><span>{{item.nick_name}}</span></div>
                    <div class="signature"><span>{{item.summary}}</span></div>
                </div>
                <div class="addbt">
                    <van-button type="success" size="mini" round @click="onAddFriend">添加好友</van-button>
                </div>
            </div>
        </div>


        <div class="tip">
        <span>好友请求列表</span>
        </div>
        <div class="item" v-for="item in list" :key="item.uid">
            <img class="face" :src="item.avatar">
            <div class="des">
                <div class="nickName"><span>{{item.nick_name}}</span></div>
                <div class="signature"><span>{{item.summary}}</span></div>
            </div>
            <div class="addbt">
                <van-button type="danger" size="mini" round @click="onRefuse(item.request_id)" >拒绝</van-button>
                <van-button type="success" size="mini" round @click="onAgree(item.request_id)" >同意</van-button>
            </div>
        </div>


    </div>

</template>



<script>
import { Toast, Button, Search, Skeleton, Cell, Image as VanImage } from 'vant';


export default {

    name: 'AddFriend',
    components: {
        [Search.name]: Search,
        [Button.name]: Button
    },

    data()  {
      return {
            list: [],
            friend: '',
            account: ''
        }
    },
    methods: {
    // 搜索好友
    onSearch (args){
        this.axios.post('/user/search_friend', {'account': args})
        .then(resp => {
            if (resp.data.code == 200){
                this.friend = [resp.data.data];
            } else if (resp.data.code == 100){
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
        },
    // 添加好友
    onAddFriend (){
        this.axios.post('/user/add_friend_request', {'add_user': this.account})
        .then(resp => {
            if (resp.data.code == 200){
                Toast.fail(resp.data.msg);
            } else if (resp.data.code == 100){
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
    },
    // 处理好友添加请求

    // 同意好友添加请求
    onAgree (res_id){
        this.axios.post('/user/confirm_add_request', {
            'request_id': res_id,
            'is_ok': true
        })
        .then(resp => {
            if (resp.data.code == 200){
                Toast.fail(resp.data.msg);
            } else if (resp.data.code == 100){
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
    },
    // 拒绝好友添加请求
    onRefuse (res_id){
        this.axios.post('/user/confirm_add_request', {
            'request_id': res_id,
            'is_ok': false
        })
        .then(resp => {
            if (resp.data.code == 200){
                Toast.fail(resp.data.msg);
            } else if (resp.data.code == 100){
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
    },
    created() {
        // 获取好友请求
        this.axios.post('user/get_friend_request')
        .then(resp => {
            if (resp.data.code == 200){
                this.list = resp.data.data
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


<style>
  .tip{
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: gray;
        padding-left: 10px;
      }
      .none{
      	display: none;
      }
      .item{
		  width: 100%;
		  height: 60px;
		  box-sizing: border-box;
		  border-bottom: 1px solid #eee;
		  background-color: #fff;
		  display: flex;
		}
		.face{
		  width: 44px;
		  height: 44px;
		  border-radius: 50%;
		  position: absolute;
		  left: 10px;
		  margin-top: 8px;
		  object-fit: cover;
		}
		.des{
		  height: 60px;
		  display: inline-block;
		  margin-left: 65px;
		  white-space :  nowrap;
		  text-overflow : ellipsis;
		  overflow:hidden;
		  flex: 1;
		}
		.nickName{
		  /*height: 30px;*/
		  margin-top: 10px;
		}
		.nickName span{
		  height: 25px;
		  line-height: 25px;
		  font-size: 16px;
		  white-space :  nowrap;
		  text-overflow : ellipsis;
		  overflow:hidden;
		}
		.signature{
		  /*height: 30px;*/
		  margin-top: -5px;
		}
		.signature span{
		  height: 20px;
		  line-height: 20px;
		  font-size: 12px;
		  color:gray;
		  white-space :  nowrap;
		  text-overflow : ellipsis;
		  overflow:hidden;
		}
		.sel{
		  width: 30px;
		  height: 60px;
		  display: inline-block;
		  /* float: right; */
		  margin-right: 5px;
		}
		.sel img{
		  width: 30px;
		  height: 30px;
		  margin-top: 15px;
		}
        .addbt {
            margin-top: 1rem;
            padding-right: 1rem;
        }

</style>
