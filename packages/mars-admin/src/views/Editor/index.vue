<template>
  <el-container class="relative w-full h-full bg-gray-200">
    <el-header class="bg-white border-b border-b-gray-300">
      <editor-header />
    </el-header>
    <el-container class="h-full">
      <el-aside
        width="65px"
        class="bg-white border-r border-r-gray-300"
      >
        <editor-menu />
      </el-aside>
      <el-aside
        v-if="subSidePanel"
        width="300px"
        class="bg-white border-r border-r-gray-300"
      >
      </el-aside>
      <el-main>
        <editor-container />
      </el-main>
      <el-aside
        width="301px"
        class="bg-white border-l border-l-gray-300"
      >
        <widget-list />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGlobalStore, useAppStore } from '@/store';
import EditorHeader from './components/EditorHeader.vue';
import EditorMenu from './components/EditorMenus.vue'

import WidgetList from './components/WidgetList/WidgetList.vue'
import EditorContainer from './components/EditorContainer/EditorContainer.vue';

const globalStore = useGlobalStore()
const appStore = useAppStore()


// 当前选中的页面的样式
const currentMenu = ref(null)

const subSidePanel = computed(() => {
  return true
  // return currentMenu.value === 'structure' ? 'widget-list' : 'material'
})

// import EditorAside from './components/EditorAside.vue'
</script>

<style scoped>

</style>