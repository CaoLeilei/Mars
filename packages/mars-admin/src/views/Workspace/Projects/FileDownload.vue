<template>
  <div class="file-download">
    <div class="fd-top">
      <div>文件名字</div>
      <el-button @click="handleDownloadBtnClick">下载</el-button>
    </div>
    <div class="">
      <el-progress :percentage="percentage">
        <el-button text>Content</el-button>
      </el-progress>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';

const percentage = ref(0);
const handleDownloadBtnClick = () => {
  console.log('handleDownloadBtnClick')
  axios.get('/WechatWebDev/release/be1ec64cf6184b0fa64091919793f068/wechat_devtools_1.06.2405010_win32_x64.exe', {
    onDownloadProgress: (progressEvent) => {
      console.log(progressEvent)
      const {progress = 0} = progressEvent || {};
      percentage.value = progress * 100;
      // if (total > 0) {
      //   percentage.value = (loaded / total * 100)
      // }
    }
  })
}

</script>

<style lang="scss" scoped>
.file-download {
  position: relative;
  display: block;
  width: 100%;

}
</style>