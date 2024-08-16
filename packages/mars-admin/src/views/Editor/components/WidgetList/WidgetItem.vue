<template>
  <div class="widget-item">
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.widget-item {
  @apply relative flex flex-row w-full h-[80px] justify-center items-center border border-gray-300 rounded-sm bg-gray-50 cursor-move select-none;
  &__icon {
    @apply relative block w-full h-[60px]
  }
}
</style>