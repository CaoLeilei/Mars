<template>
 <ElPopover
  class="SettingMenu"
  placement="right"
  title=""
  trigger="click"
  :show-arrow="false"
  :width="120"
  :popper-style="popoverStyle"
>
  <ul class="MenuList">
    <li>
      <a class="MenuList__Item" href="javascript:;">系统设置</a>
    </li>
    <li>
      <a class="MenuList__Item" href="javascript:;">工作区设置</a>
    </li>
    <li>
      <a class="MenuList__Item" href="javascript:;">项目设置</a>
    </li>
  </ul>
  <template #reference>
    <div class="SettingMenu__IconBox">
      <ElIcon><Tools /></ElIcon>
    </div>
  </template>
</ElPopover>
</template>

<script lang="ts" setup>
const popoverStyle = {
  padding: 0,
  margintLeft: '20px'
}
console.log(popoverStyle)
</script>

<style lang="scss" scoped>
.SettingMenu {

}

.SettingMenu__IconBox {
  @apply flex w-full h-16 justify-center items-center text-2xl cursor-pointer;
}

.MenuList {
  @apply w-full list-image-none m-0 pl-0 pr-0 pt-2 pb-2;

  > li {
    @apply w-full m-0 p-0;
  }

  .MenuList__Item {
    @apply block h-8 leading-8 border-r-2 box-border pl-4 pr-2 hover:bg-gray-100;
  }
}

</style>