<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <van-cell title="发个动态" icon="add-o" is-link to="addnews" value="走你" />
    
    <div class="tip">
      <span>动态列表</span>
    </div>

    <div v-for="item in news" :key="item.pk">
      <div class="item">
        <img class="face" :src="item.avatar">
        <div class="des">
          <div class="nickName"><span>{{item.nickname}}</span></div>
          <div class="signature"><span>{{item.title}}</span></div>
        </div>
      </div>

      <!-- <div class="img-box" v-for="url in item.files" :key="url">
        <van-image
          width="150"
          height="150"
          :src="url"
          fit="cover"
        />
      </div> -->

      <div v-viewer>
        <img class="img-box" v-for="src in item.files" :key="src" :src="src">
      </div>

      <div class="post-date">
          <div class="signature"><span>发布于:{{item.create_date}}</span></div>
      </div>

    </div>


    <van-skeleton title avatar :row="3" :loading="loading"/>
    <Tabbar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from '@/components/Tabbar.vue'
import { Toast, Empty, Skeleton, Cell, Image as VanImage, Tag } from 'vant';

export default {
  name: 'Home',
  components: {
    Tabbar,
    [Empty.name]: Empty,
    [Skeleton.name]: Skeleton,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [VanImage.name]: VanImage,
    [Tag.name]: Tag
  },

  data() {
    return{
      news: [],
      loading: ''
    }
  },

  // 获取所有的动态
  created() {
    this.axios.post('/user/get_news')
      .then(resp => {
          if (resp.data.code == 200){
            this.news = resp.data.data;
            this.loading = false;
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
		  height: 15%;
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
		  height: 30px;
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
    /* .div-box {
      margin-bottom: 50px;
    } */
    .img-box {
      width: 45%;
      margin-left: 10px;
      margin-bottom: 2px;
      float: left;
    }

    .post-date {
		  width: 100%;
      margin-left: 10px;
      /* margin-top: 2px; */
		  display: flex;
		}

    

</style>
