<template>
    <div class="news">
        <van-form @submit="onAddNews">
            <van-cell title="动态" icon="arrow-left" is-link to="/" value="返回" />

            <van-cell-group>
                <van-field
                    name="title"
                    v-model="title"
                    type="textarea"
                    maxlength="512"
                    placeholder="这一刻的想法..."
                    show-word-limit
                />
            </van-cell-group>

            <van-field name="files">
            <template #input>
                <van-uploader v-model="files" :max-size="5000 * 1024" :max-count="6" multiple/>
            </template>
            </van-field>

            <van-field
                v-model="result"
                name="showPicker"
                is-link
                readonly
                placeholder="谁可以看"
                @click="onConfirm"
            />
            <van-popup v-model:show="showPicker" position="bottom">

                <van-checkbox-group v-model="checked" ref="checkboxGroup">
                    <van-cell-group>
                        <van-cell title="动态" icon="arrow-left" is-link to="/" value="返回" />
                        <div class="addbt">
                            <van-button type="danger" size="mini" round @click="checkAll">全部好友</van-button>
                            <van-button type="success" size="mini" round @click="toggleAll">反选</van-button>
                        </div>
                        <div class="tip">
                        <span>默认仅自己的好友可见</span>
                        </div>
                        
                        <div class="item" v-for="(item, index) in friends" :key="item.uid">
                            <img class="face" :src="item.avatar">
                            <div class="des" @click="toggle(index)">
                                <div class="nickName"><span>{{item.nick_name}}</span></div>
                                <div class="signature"><span>{{item.summary}}</span></div>
                            </div>
                            <div class="addbt" name="fgfgf">
                                <van-checkbox
                                checked-color="#7232dd"
                                :name="item.uid"
                                :ref="el => checkboxRefs[index] = el"
                                @click.stop
                                />
                            </div>
                        </div>

                    </van-cell-group>
                </van-checkbox-group>


            </van-popup>

            <div style="margin: 16px;">
                <van-button round block color="#7232dd" native-type="submit">
                发布动态
                </van-button>
            </div>
        </van-form>
    </div>
</template>


<script>
import { ref } from 'vue';
import { Toast, Button, CellGroup , Cell, Form, Field, Uploader, Picker, Popup, Checkbox, CheckboxGroup } from 'vant';


export default {
  name: 'AddNews',
  components: {
    [Button.name]: Button,
    [ref.name]: ref,
    [CellGroup .name]: CellGroup,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [Form.name]: Form,
    [Uploader.name]: Uploader,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },

  data (){
      return {
          files: [],
          title: '',
          result: '',
          showPicker: false,
          checked: [],
          friends: [],
          checkboxRefs: []
      }
  },

  methods:{
      onAddNews() {
          //   发送动态
          if (this.files.length == 0){
              if (this.title == ''){
                  Toast.fail('发点东西吧!');
              } else{
                let params = { "title": this.title, "friend_view_list":  this.checked};
                this.axios.post('/user/post_news', params)
                    .then(resp => {
                        if (resp.data.code == 200){
                            Toast.fail(resp.data.msg);
                            console.log(params)
                        } else if (resp.data.code == 100){
                            Toast.fail("没有好友,快去添加好友吧");
                        } else if (resp.data.code == -99){
                            Toast.fail(resp.data.msg);
                        } else if (resp.data.code == -5){
                            Toast.fail(resp.data.msg);
                            // 重定向到登录
                            this.redirect_login();
                        }
                    }).catch(err => {
                        Toast.fail('发生错误!');
                        console.log(params);
                    });
             }
          } else{
              if (this.title == ''){
                  Toast.fail('发点东西吧!');
              } else{
                let params = { "title": this.title, "files": this.files, "friend_view_list":  this.checked};
                this.axios.post('/user/post_news', params)
                    .then(resp => {
                        if (resp.data.code == 200){
                            Toast.fail(resp.data.msg);
                            console.log(params)
                        } else if (resp.data.code == 100){
                            Toast.fail("没有好友,快去添加好友吧");
                        } else if (resp.data.code == -99){
                            Toast.fail(resp.data.msg);
                        } else if (resp.data.code == -5){
                            Toast.fail(resp.data.msg);
                            // 重定向到登录
                            this.redirect_login();
                        }
                    }).catch(err => {
                        Toast.fail('发生错误!');
                        console.log(params);
                    });
             }

          }
      },
      onConfirm() {
          //   获取自己的好友列表
          this.axios.post('/user/get_friend_list')
            .then(resp => {
                if (resp.data.code == 200){
                    this.friends = resp.data.data
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
          this.showPicker = true;
      },
      //  全选好友
      checkAll() {
          this.$refs.checkboxGroup.toggleAll(true);
     },
     //  反选好友
      toggleAll() {
          this.$refs.checkboxGroup.toggleAll();
    },
      toggle(index) {
          this.checkboxRefs[index].toggle();
          console.log(this.checked);
    }
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
            display: flex;
            margin-top: 0.5rem;
            margin-bottom: 0.3rem;
            padding-right: 1rem;
            margin-left: 0.7rem;
        }

</style>
