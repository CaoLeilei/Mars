<template>
<el-container class="">
  <el-aside width="65px" class="LayoutAside">
    <div class="LayoutAsideInner">
      <!-- 阿达说的 -->
      <slot name="aside"></slot>
    </div>
  </el-aside>
  <el-container>
    <el-header class="LayoutHeader" height="65px">
      <slot name="header" />
    </el-header>
    <el-main>
      <slot name="default" />
    </el-main>
    <el-footer>
      <slot name="footer" />
    </el-footer>
  </el-container>
</el-container>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.Layout {
  @apply relative w-full h-full;

  &Header {
  }
  &AsideInner {
    @apply relative block w-full h-full overflow-hidden bg-white border-r-gray-200;
  }
}

</style>