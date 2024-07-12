<template>
  <el-config-provider namespace="ep">
    <div class="flex w-full h-full">
      <RouterView />
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
  width: 100%;
  height: 100%;
  @apply bg-gray-100;
}

</style>
