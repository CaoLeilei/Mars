<template>
  <el-container class="workspace-layout">
    <el-aside width="81px" class="workspace-layout__menubar">
      <div class="workspace-layout__menuinner">
        <el-menu
          router
          default-active="0"
          class="workspace-layout__menu"
          :collapse="true"
          :ellipsis="false"
        >
          <el-menu-item index="/workspace">
            <el-icon><Grid /></el-icon>
            <span>Apps</span>
          </el-menu-item>
          <el-menu-item index="/workspace/database">
            <el-icon><Coin /></el-icon>
            <span>数据库</span>
          </el-menu-item>
          <el-menu-item index="/workspace/datasource">
            <el-icon><WalletFilled /></el-icon>
            <span>数据源</span>
          </el-menu-item>
          <el-menu-item index="/workspace/auth">
            <el-icon><User /></el-icon>
            <span class="wp-menu__text">身份认证</span>
          </el-menu-item>
          <el-divider></el-divider>
          <el-menu-item index="/workspace/setting">
            <el-icon><Setting /></el-icon>
            <span class="wp-menu__text">系统设置</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main class="workspace-layout__container">
      <slot />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.workspace-layout {
  @apply relative h-[100vh] w-full bg-gray-50;

  &__header {
    @apply bg-white shadow-sm border-b border-b-gray-200;
  }

  &__container {
    @apply relative w-full h-full p-0;
  }

  &__menubar {
    @apply h-full bg-white border-r border-r-gray-200;
  }
  &__menuinner {
    @apply relative flex justify-between items-center flex-col w-full h-full justify-between box-border pt-4 pb-4;
  }
  &__menu {
    width: 56px;
    border-right: none;
    :deep(.el-menu-item) {
      @apply flex h-auto flex-col justify-center items-center rounded-sm mb-2 p-0 pt-2 pb-2;
      &.is-active {
        &,
        &:hover {
          background: #e7edfd;
        }
      }
      &>.el-icon {
        font-size: 24px;
      }
      &>span {
        @apply h-auto w-auto space-y-1 leading-none pt-1;
        font-size: 12px;
        visibility: visible;
      }
    }
  }
}
</style>