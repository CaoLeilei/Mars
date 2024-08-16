<template>
  <client-only>
    <div class="home-header">
      <el-menu
        :default-active="activeIndex"
        class="home-header__menu"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <span>logo</span>
          <!-- <img
            style="width: 100px"
            src="/images/element-plus-logo.svg"
            alt="Element logo"
          /> -->
        </el-menu-item>
        <el-menu-item index="1">Home</el-menu-item>
        <el-menu-item index="1">Pricing</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>

      <div class="home-header__opt">
        <el-button type="primary" text @click="handleLoginBtnClick">
          Login
        </el-button>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

console.log('route:', router)

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

/**
 * 登录按钮的点击事件
 */
const handleLoginBtnClick = () => {
  console.log('handleLoginBtnClick')
}

</script>

<style lang="scss" scoped>
.home-header {
  @apply relative flex justify-between w-full h-full max-w-[1600px] ml-auto mr-auto;
  // background: red;

  &__menu {
    border-bottom: none;
    // @apply flex justify-between w-full h-full;
  }

  &__opt {
    @apply flex justify-between h-full items-center;
  }
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  @apply mr-6;
}
</style>