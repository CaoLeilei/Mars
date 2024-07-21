<template>
<el-container class="">
  <el-aside width="65px" class="layout__aside">
    <div class="layout__aside-inner">
      <!-- 阿达说的 -->
      <slot name="aside"></slot>
    </div>
  </el-aside>
  <el-container>
    <el-page-header class="layout__header">
      <slot name="default"></slot>
    </el-page-header>
    <!-- <el-header class="LayoutHeader" height="65px">
      <slot name="header" />
    </el-header>
    <el-main>
      <slot name="default" />
    </el-main>
    <el-footer>
      <slot name="footer" />
    </el-footer> -->
  </el-container>
</el-container>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.layout {
  @apply relative w-full h-full;

  &__Header {
    ::v-deep(.ep-page-header__header) {
    @apply h-16 pl-3 pr-3 box-border bg-white;
  }

  ::v-deep(.ep-page-header__main) {
    height: calc(100vh - 170px);
    @apply mt-0 box-border p-4 overflow-auto;
  }
  }
  &__aside-inner {
    @apply relative block w-full h-full overflow-hidden bg-white border-r-gray-200;
  }
}

</style>