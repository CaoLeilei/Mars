<template>
  <div class="widget-group">
    <div class="widget-group__title">常用组件</div>
    <div class="widget-group__content">
      <el-row :gutter="8">
        <el-col :span="8">
          <widget-item />
        </el-col>
        <el-col :span="8">
          <widget-item />
        </el-col>
        <el-col :span="8">
          <widget-item />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WidgetItem from './WidgetItem.vue';
</script>

<style lang="scss" scoped>
.widget-group {
  @apply relative box-border pt-3 pb-3 text-sm text-gray-500;
  &__title {
    @apply mb-2;
  }
  &__body {}
}
</style>