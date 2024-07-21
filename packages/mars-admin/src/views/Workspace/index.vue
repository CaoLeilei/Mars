<template>
  <el-container class="workspace">
    <el-aside width="180px" class="workspace__aside">
      <WorkspaceAside />
    </el-aside>
    <el-main class="workspace__main">
      <el-page-header class="workspace__page">
        <RouterView />
      </el-page-header>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import WorkspaceAside from './components/WorkspaceAside.vue';


</script>

<style lang="scss" scoped>
.workspace {
  @apply relative w-full h-full;

  &__aside {
    @apply bg-white border-r border-r-gray-200;
  }

  &__main {
    @apply p-0;
  }

  &__header {
    @apply bg-white border-b border-b-gray-200 shadow-sm shadow-gray-200;
  }

  &__page {
    @apply relative w-full h-full;

    ::v-deep(.ep-page-header__header) {
      @apply h-16 pl-3 pr-3 box-border  bg-white;
    }
    ::v-deep(.ep-page-header__main) {
      height: calc(100vh - 170px);
      @apply mt-0 box-border p-4 overflow-auto;
    }
  }
}
</style>