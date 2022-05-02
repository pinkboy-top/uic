<template>
    <div class="news">
        <van-form @submit="onAddNews">
            <van-cell title="动态" icon="arrow-left" is-link to="/" value="返回" />

            <van-cell-group>
                <van-field
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
                is-link
                readonly
                name="picker"
                placeholder="谁可以看"
                @click="showPicker = true"
            />
            <van-popup v-model:show="showPicker" position="bottom">
                <van-picker
                    :columns="columns"
                    @confirm="onConfirm()"
                    @cancel="showPicker = false"
                />
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
import { Toast, Button, CellGroup , Cell, Form, Field, Uploader, Picker, Popup } from 'vant';


export default {
  name: 'AddNews',
  components: {
    [Button.name]: Button,
    [CellGroup .name]: CellGroup,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [Form.name]: Form,
    [Uploader.name]: Uploader,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },

  data (){
      return {
          files: [],
          title: '',
          result: '',
          showPicker: false,
          columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
      }
  },

  methods:{
      onAddNews(values){
          Toast.fail('hello');
      },
      onConfirm(value){
        this.showPicker = true;
      }
  }
}
</script>