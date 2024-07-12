<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex-auto">
      <div class="pt-3 pb-3">
        <div class="editor-menus__item">
          <div class="editor-menus__icon">
            <el-icon><Tickets /></el-icon>
          </div>
          <div class="editor-menus__text">页面</div>
        </div>
        <div class="editor-menus__item">
          <div class="editor-menus__icon">
            <el-icon><Grid /></el-icon>
          </div>
          <div class="editor-menus__text">组件</div>
        </div>
        <div class="editor-menus__item">
          <div class="editor-menus__icon">
            <el-icon><MessageBox /></el-icon>
          </div>
          <div class="editor-menus__text">接口</div>
        </div>
        <div class="editor-menus__item">
          <div class="editor-menus__icon">
            <el-icon><Coin /></el-icon>
          </div>
          <div class="editor-menus__text">数据</div>
        </div>
        <el-divider></el-divider>
        <div class="editor-menus__item" @click="handleMenuItemClick">
          <div class="editor-menus__icon">
            <el-icon><Help /></el-icon>
          </div>
          <div class="editor-menus__text">结构</div>
        </div>
        <div class="editor-menus__item" @click="handleMenuItemClick">
          <div class="editor-menus__icon">
            <el-icon><PictureFilled /></el-icon>
          </div>
          <div class="editor-menus__text">素材</div>
        </div>
      </div>
    </div>
    <div class="flex-none"></div>
  </div>
</template>

<script setup lang="ts">
// 菜单项的单击事件
const handleMenuItemClick = () => {}
</script>

<style lang="scss" scoped>
.editor-menus {
  @apply flex flex-col w-full h-full;
  &__wrapper {
    @apply flex-auto;
  }
  &__item {
    @apply flex flex-col pt-2 pb-2 mt-3 mb-3 cursor-pointer select-none hover:bg-gray-100
  }
  &__icon {
    @apply flex items-center justify-center mb-1 text-lg
  }
  &__text {
    @apply text-sm line-clamp-1 text-center
  }
}
</style>