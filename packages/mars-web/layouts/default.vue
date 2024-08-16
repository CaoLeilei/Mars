<template>
  <el-container class="default-layout">
    <el-header class="default-layout__header" height="60px">
      <home-header />
    </el-header>
    <el-main class="default-layout__main">
      <div class="default-layout__container">
        <slot />
      </div>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import HomeHeader from '~/components/common/HomeHeader.vue';

</script>

<style scoped>
.default-layout {
  @apply relative w-full bg-gray-100;

  &__header {
    @apply bg-white shadow-sm;
  }
  &__main {
    padding: 0;
  }
  &__container {
    @apply relative w-full max-w-[1600px] ml-auto mr-auto;
  }
}
</style>