<template>
  <div class="tpl-select">
    <div  class="tpl-select__search">
      <el-input
        v-model="search"
        placeholder="请输入模板名称"
        clearable
        @clear="handleClear"
        @input="handleInput"
      >
        <template #prefix>
          <i class="el-input__icon el-icon-search"></i>
        </template>
      </el-input>
    </div>
    <div class="tpl-select__list">
      <el-card
        v-for="(item, index) in list"
        :key="index"
        class="tpl-select__item"
        shadow="hover"
        @click="handleSelect(item)"
      >
        <div class="tpl-select__item__title">{{ item.name }}</div>
        <div class="tpl-select__item__desc">{{ item.desc }}</div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

interface ITemplate {
  name: string;
  desc: string;
}

const search = ref('');
const list: Ref<ITemplate[]> = ref<ITemplate[]>([])

const handleInput = () => {
  // TODO: 搜索
};

const handleSelect = (item: any) => {
  // TODO: 选择模板
};
const handleClear = () => {
  // TODO: 关闭
};
</script>

<style lang="scss" scoped>
.tpl-select {
  &__search {
    @apply block w-full h-[50px] box-border border border-gray-300 rounded-md;
  }
  &__tpls {
    @apply block w-full h-[450px] box-border border border-gray-300 rounded-md;
  }
}
</style>