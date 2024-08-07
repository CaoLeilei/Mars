<template>
  <div class="editor-header">
    <div class="editor-header__left"></div>
    <div class="editor-header__center">
      <el-radio-group v-model="viewType" size="small">
        <el-radio-button value="New York" >
          <el-icon><Monitor /></el-icon>
        </el-radio-button>
        <el-radio-button value="Washington">
          <el-icon><Cellphone /></el-icon>
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="editor-header__right">
      <el-button>导入</el-button>
      <el-button>导入</el-button>
      <el-button>导入</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const viewType = ref('')

</script>

<style lang="scss" scoped>
.editor-header {
  @apply relative flex w-full h-full justify-between items-center;

  &__left,
  &__right {
    @apply flex justify-start items-center;
  }
  &__center {
    @apply flex w-auto h-full items-center justify-center;
  }
}
</style>