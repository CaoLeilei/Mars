<template>
  <el-container class="projects">
    <el-header class="projects__header" height="40px">
      <el-button type="primary w-12">创建项目</el-button>
    </el-header>
    <el-main class="projects__main">
      <el-row gutter="12">
        <el-col></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.projects {
  @apply relative w-full h-full;

  &__header {
    @apply pl-0 pr-0;
  }
  &__main {
    @apply p-0;
  }
}
</style>