<template>
  <el-page-header class="projects">
  </el-page-header>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.projects {
  @apply relative w-full h-full;

  ::v-deep(.ep-page-header__header) {
    @apply h-16 pl-3 pr-3 box-border bg-white;
  }

  ::v-deep(.ep-page-header__main) {
    height: calc(100vh - 170px);
    @apply mt-0 box-border p-4 overflow-auto;
  }
}
</style>