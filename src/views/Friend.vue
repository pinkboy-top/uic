<template>
    <div class="friend">
        
        <van-cell title="新的朋友" icon="friends-o" is-link to="addfriend">
          <p style="margin-top: 0px; color: red" v-if="msg === 'security' ">新好友请求!</p>
        </van-cell>

        <van-skeleton avatar :row="3" :round='true' :loading="loading" />

        <div class="tip">
          <span>好友列表</span>
        </div>
        <div class="item" v-for="item in list" :key="item.uid">
          <img class="face" :src="item.avatar">
          <div class="des">
            <div class="nickName"><span>{{item.nick_name}}</span></div>
            <div class="signature"><span>{{item.summary}}</span></div>
          </div>
        </div>

        <Tabbar/>
  </div>
</template>


<script>
import Tabbar from '@/components/Tabbar.vue';
import { Toast, Empty, Search, Skeleton, Cell, Image as VanImage, Icon} from 'vant';


export default {

  name: 'Friend',
  components: {
    Tabbar,
    [Empty.name]: Empty,
    [Search.name]: Search,
    [Skeleton.name]: Skeleton,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon
  },

  data() {
      return{
          list: [],
          loading: '',
          msg: false
      }
  },

  // 获取好友列表和好友请求
  created() {
    this.axios.post('/user/get_friend_list')
      .then(resp => {
          if (resp.data.code == 200){
            this.list = resp.data.data
            this.loading = false
          } else if (resp.data.code == 100){
              Toast.fail("没有好友,快去添加好友吧");
          } else if (resp.data.code == -5){
              Toast.fail(resp.data.msg);
              // 重定向到登录
              this.redirect_login();
          }
      }).catch(err => {
          Toast.fail('发生错误!');
          console.log(err);
    });
    // 获取好友请求
    this.axios.post('user/get_friend_request')
      .then(resp => {
            if (resp.data.code == 200){
                this.msg = resp.data.msg
            } else if (resp.data.code == -10){
                // Toast.fail(resp.data.msg);
                this.msg = false
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

</style>