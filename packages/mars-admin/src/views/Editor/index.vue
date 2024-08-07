<template>
  <el-container class="relative w-full h-full bg-gray-200">
    <el-header class="bg-white border-b border-b-gray-300">
      <editor-header />
    </el-header>
    <el-container class="h-full">
      <el-aside width="65px" class="bg-white border-r border-r-gray-300">
        <editor-menu />
      </el-aside>
      <el-aside width="301px" class="bg-gray-100 border-r border-r-gray-300">
        <editor-aside />
      </el-aside>
      <el-main>
        <editor-container />
      </el-main>
      <el-aside width="301px" class="bg-gray-100 border-l border-l-gray-300"></el-aside>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGlobalStore, useAppStore } from '@/store';
import EditorHeader from './components/EditorHeader.vue';
import EditorMenu from './components/EditorMenus.vue'

import EditorContainer from './components/EditorContainer/EditorContainer.vue';

const globalStore = useGlobalStore()
const appStore = useAppStore()


// 当前选中的页面的样式
const currentMenu = ref(null)

// import EditorAside from './components/EditorAside.vue'
</script>

<style scoped>

</style>