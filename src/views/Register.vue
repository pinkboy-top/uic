<template>
    <div id="registered">
        <div id="login_img"><van-image
            round
            width="8rem"
            height="4rem"
            :src="require('../assets/logo.png')" />
        </div>
        <van-form @submit="onSubmit">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
            v-model="account"
            name="account"
            left-icon="contact"
            label="账号"
            placeholder="输入一个你喜欢的东西当作账号吧"
            :rules="[{ pattern: /^[a-zA-Z\d]{6,16}$/, message: '小于16位大于6位的字母或数字' }]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <van-field
            v-model="password"
            type="password"
            name="password"
            left-icon="passed"
            label="密码"
            placeholder="密码要大于6位的字母或数字哟!"
            :rules="[{ pattern: /^[a-zA-Z\d]{6,16}$/, message: '密码要大于6位的字母或数字哟!' }]"
        />

        <van-field
          v-model="password1"
          name="password1"
          type="password"
          left-icon="passed"
          label="确认密码"
          placeholder="密码要大于6位的字母或数字哟!"
          :rules="[{ validator, message: '两次密码不一致哟!' }]"
        />

        <van-field
          v-model="phone"
          name="phone"
          type="tel"
          left-icon="phone-o"
          label="手机号"
          placeholder="要输入自己的手机号哟!"
          :rules="[{ pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, message: '不是正确的手机号格式哟!' }]"
        />

        <van-field
            v-model="nickname"
            type="text"
            name="nickname"
            label="昵称"
            left-icon="bulb-o"
            maxlength="16"
            placeholder="也可以是你的外号。。哈哈"
            :rules="[{ required: true, message: '你还没有填写昵称呢。。' }]"
        />


        <van-field
            v-model="signature"
            name="signature"
            rows="2"
            left-icon="info-o"
            autosize
            label="签名"
            type="textarea"
            maxlength="256"
            placeholder="请输入签名"
            show-word-limit
            :rules="[{ required: true, message: '你还没有填写签名呢。。' }]"
        />
       

        <van-field name="avatar" left-icon="smile-o" label="头像" :rules="[{ required: true, message: '你还没有上传头像呢。。' }]">
        <template #input>
            <van-uploader v-model="avatar" :max-count="1" />
        </template>
        </van-field>

        <div id="date_time_picker">
            <van-cell icon="birthday-cake-o" is-link value="破壳日" @click="showPopup"></van-cell>
            <van-popup v-model:show="show" position="bottom" :style="{ height: '40%' }">
                <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @change="changeFn()"
                @confirm="confirmFn()"
                @cancel="cancelFn()"
                />
            </van-popup>
            <van-field v-model="birth_time" name="birth_time" placeholder="选择的日期" readonly :rules="[{ required: true, message: '你还没有选择生日呢。。' }]" />
        </div>

        <van-field name="gender" left-icon="closed-eye" label="性别" :rules="[{ required: true, message: '你还没有选择性别呢。。' }]">
            <template #input>
                <van-radio-group v-model="sex" direction="horizontal">
                    <van-radio checked-color="#cc66ff" name="male" label-position="left">
                        
                        <template #icon="props">
                            <img class="img-icon" :src="props.checked ? activeIcon : activeIcons" />
                        </template>
                    </van-radio>
                    <van-radio checked-color="#cc66ff" name="female" label-position="left">
                        
                        <template #icon="props">
                            <img class="img-icon" :src="props.checked ? inactiveIcon : inactiveIcons" />
                        </template>
                    </van-radio>
                </van-radio-group>
            </template>
        </van-field>

          <div style="margin: 16px;">
            <van-button round block color="#7232dd" native-type="submit">
            注册账号
            </van-button>
        </div>
        </van-form>
    </div>
</template>

<script>
import { Toast, Image, Form, Field, CellGroup, Button, Uploader, DatetimePicker, Popup, Cell, RadioGroup, Radio } from 'vant';
import activeIcon from '../assets/male_active.png'
import inactiveIcon from '../assets/female_active.png'
import activeIcons from '../assets/male.png'
import inactiveIcons from '../assets/female.png'
import logo from '../assets/logo.png'


export default {
    data() {
        return {
            account: '',
            password: '',
            password1: '',
            phone: '',
            nickname: '',
            signature: '',
            avatar: [],
            show: false, // 用来显示弹出层
            birth_time: '',
            minDate: new Date(1990, 0, 1),
            maxDate: new Date(2099, 0, 31),
            currentDate: new Date(),
            changeDate: new Date(),
            sex: '',
            checked: '',
            activeIcon: activeIcon,
            inactiveIcon: inactiveIcon,
            activeIcons: activeIcons,
            inactiveIcons: inactiveIcons,
            logo
        };
    },
    // 引入的vant组件
    components: {
        [Button.name]: Button,
        [Toast.name]: Toast,
        [Image.name]: Image,
        [Form.name]: Form,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Uploader.name]: Uploader,
        [DatetimePicker.name]: DatetimePicker,
        [Popup.name]: Popup,
        [Cell.name]: Cell,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio
    },
    methods: {
        redirect_login() {
            this.$router.push('login')
        },
        onSubmit(values) {
            // console.log(values)
            this.axios.post('/user/register', values)
            .then(resp => {
                if (resp.data.code == 200){
                        Toast({
                        message: '注册成功',
                        icon: 'like-o',
                    })
                    // 注册成功后延迟三秒后跳转到登录页面
                    setTimeout(this.redirect_login, 3000)
                } else{
                    Toast({
                        message: resp.data.msg,
                        icon: 'like-o',
                    })
                }
            }).catch(err => {
                console.log(err);
                Toast({
                        message: "发生错误",
                        icon: 'like-o',
                })
            })
        },
        validator(val) {
            //验证两次密码是否一致
            if (val !== this.password){
                return false
            } else {
                return true
            }
        },
        message(){
            Toast({
                message: this.show,
                icon: 'https://img.yzcdn.cn/vant/logo.png',
            })
        },
        showPopFn() {
            this.show = true
        },
        showPopup() {
            this.show = true
        },
        changeFn() { // 值变化是触发
            this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
        },
        confirmFn() { // 确定按钮
            this.birth_time = this.timeFormat(this.currentDate)
            this.show = false
        },
        cancelFn(){
            this.show = true
        },
        timeFormat(time) { // 时间格式化 2019-09-08
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            let day = time.getDate()
            return year + '-' + month + '-' + day
        },
        mounted() {
            this.timeFormat(new Date())
            },
        },
    }
</script>


<style scoped>
    #login_img {
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
}
  .img-icon {
    height: 20px;
}
</style>