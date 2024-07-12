<template>
  <ElContainer class="relative w-full h-full bg-gray-200">
    <ElHeader class="bg-white border-b border-b-gray-300">
      <EditorHeader />
    </ElHeader>
    <ElContainer class="h-full">
      <ElAside width="65px" class="bg-white border-r border-r-gray-300">
        <EditorMenu />
      </ElAside>
      <ElAside width="301px" class="bg-gray-100 border-r border-r-gray-300">
        <EditorAside />
      </ElAside>
      <ElMain>
        <EditorContainer />
      </ElMain>
      <ElAside width="301px" class="bg-gray-100 border-l border-l-gray-300"></ElAside>
    </ElContainer>
  </ElContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGlobalStore } from '~/store/globalStore';
import { useAppStore } from '~/store/appStore';
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