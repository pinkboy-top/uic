<template>
    <div class="friend">
        
        <van-cell title="聊天列表" icon="chat-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-icon name="search" class="search-icon" />
            </template>
        </van-cell>

        <van-skeleton avatar :row="3" :round='true' :loading="loading" />

        <div class="tip">
          <span>消息列表</span>
        </div>

        <div v-for="item in list" :key="item.chat_id" @click="onTochat(item.chat_id)">

          <div class="item" v-if="item.uid == item.send_user_id">
            <img class="face" :src="imgUrl.imgUrl + item.accept_user_avatar">
            <div class="des">
              <div class="nickName"><span>{{item.accept_user_nick_name}}</span></div>
              <div class="signature"><span>{{item.accept_user_account}}</span></div>
            </div>
          </div>

          <div class="item" v-if="item.uid == item.accept_user_id">
            <img class="face" :src="imgUrl.imgUrl + item.send_user_avatar">
            <div class="des">
              <div class="nickName"><span>{{item.send_user_nick_name}}</span></div>
              <div class="signature"><span>{{item.send_user_account}}</span></div>
            </div>
          </div>

        </div>
        

        <Tabbar/>
  </div>
</template>


<script>
import Tabbar from '@/components/Tabbar.vue';
import { Toast, Empty, Search, Skeleton, Cell, Image as VanImage, Icon} from 'vant';
import imgUrl from '@/global';


export default {

    name: 'Friend',
    components: {
    Tabbar,
    [Empty.name]: Empty,
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Skeleton.name]: Skeleton,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon
    },

    data() {
        return {
            list: [],
            loading: '',
            msg: false,
            imgUrl
        }
    },

    methods: {

        // 打开对应的聊天
        onTochat(chat_id) {
            this.$router.push('/msg/?chat_id=' + chat_id);
        }
    },

    // 获取好友列表和好友请求
    created() {
    this.axios.post('/user/get_msg_list')
        .then(resp => {
            if (resp.data.code == 200){
            this.list = resp.data.data
            this.loading = false
            } else if (resp.data.code == 100){
                Toast.fail("没有聊天");
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

    .custom-title {
      margin-right: 4px;
      vertical-align: middle;
    }
    .search-icon {
      font-size: 16px;
      line-height: inherit;
    }


    .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-icon {
    font-size: 30px;
    line-height: inherit;
  }
</style>