<template>
  <div class="wp-aside">
    <div class="wp-aside__top">
      <div class="wp-aside__logo"></div>
      <el-menu class="wp-menu" default-active="2">
        <el-menu-item index="1-1">
          <el-icon><Tickets /></el-icon>
          <span class="wp-menu__text">项目管理</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <el-icon><Tickets /></el-icon>
          <span class="wp-menu__text">数据库管理</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <el-icon><Tickets /></el-icon>
          <span class="wp-menu__text">数据源管理</span>
        </el-menu-item>
        <el-menu-item index="1-4">
          <el-icon><Tickets /></el-icon>
          <span class="wp-menu__text">团队管理</span>
        </el-menu-item>
        <el-menu-item index="1-5">
          <el-icon><Tickets /></el-icon>
          <span class="wp-menu__text">人员管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="wp-aside__bottom"></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.wp-aside {
  @apply relative flex flex-col w-full h-full justify-between;

  &__top {
    @apply relative w-full;
  }

  &__bottom {
    @apply relative w-full;
  }

  &__logo {
    height: 65px;
    @apply block relative w-full text-center;
  }
}

.wp-menu {
  // @apply flex w-full flex-col;
  &__item {
    @apply flex flex-col w-full justify-center pt-2 pb-2 mt-2 mb-2 cursor-pointer select-none hover:bg-gray-100;
  }

  &__text {
    // font-size: 16px;
    @apply text-sm line-clamp-1 text-center;
  }

}
</style>