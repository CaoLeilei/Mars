<template>
  <el-container class="workspace">
    <el-aside
      width="250px"
      class="workspace__aside"
    >
      <WorkspaceAside />
    </el-aside>
    <el-container>
      <el-header
        class="workspace__header"
        height="65px"
      >
        <WorkspaceHeader />
      </el-header>
      <el-main class="workspace__main">
        <RouterView />
      </el-main>
      <el-footer height="40px">
        <slot name="footer" />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import WorkspaceAside from './components/WorkspaceAside.vue';
import WorkspaceHeader from './components/WorkspaceHeader.vue';

</script>

<style lang="scss" scoped>
.workspace {
  @apply relative w-full h-full;

  &__header {
    @apply bg-white border-b border-b-gray-200 shadow-sm shadow-gray-200;
  }

  &__aside {
    @apply bg-white border-r border-r-gray-200;
  }

  &__main {
    @apply p-0;
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