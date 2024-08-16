<template>
  <div class="widget-list">
    <div class="widget-list__header">
      <h3 class="widget-list__title">
        组件列表
      </h3>
      <div class="widget-list__search">
        <el-input
          clearable
          placeholder="请输入组件名称"
          v-model="searchInputValue"
          :prefix-icon="Search"
          @change="handleSearchInputChange"
        />
      </div>
    </div>
    <div class="widget-list__body">
      <widget-group></widget-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import WidgetGroup from './WidgetGroup.vue'

const searchInputValue = ref('')
const handleSearchInputChange = () => {
  console.log(searchInputValue.value)
}

</script>

<style lang="scss" scoped>
.widget-list {
  @apply relative block w-full h-full box-border pt-3 pb-3 pl-4 pr-4;
  &__title {
    @apply relative block text-sm font-bold text-gray-500 mb-3;
  }
  &__search {
    @apply relative block w-full;
  }
}
</style>