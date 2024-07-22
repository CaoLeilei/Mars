<template>
<div class="auth">
  <div class="auth__container">
    <el-card class="auth__inner">
      <router-view></router-view>
    </el-card>
  </div>
  <auth-background></auth-background>
</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AuthBackground from './Components/AuthBackground/index.vue'

</script>

<style lang="scss" scoped>
.auth {
  @apply relative w-full h-full;

  &__container {
    @apply relative flex items-center justify-center w-full h-full z-10;
  }
  &__inner {
    @apply relative w-[500px] bg-white rounded-lg shadow-lg shadow-gray-200;
  }
}
</style>