<template>
<div class="auth">
  <div class="auth__container">
    <el-card class="auth__card">
      <div class="auth__card-header">
        <div class="auth__logo"></div>
      </div>
      <div class="auth__card-body">
        <router-view></router-view>
      </div>
    </el-card>
  </div>
</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AuthBackground from './Components/AuthBackground/index.vue'

</script>

<style lang="scss" scoped>
.auth {
  background: #f6f6f9;
  @apply relative w-full h-full;

  &__container {
    @apply relative flex items-center justify-center w-full h-full z-10 box-border pl-8 pr-8;
  }
  &__card {
    @apply relative w-[552px] bg-white rounded-lg shadow-lg shadow-gray-200;
  }

  &__card-header {
    @apply flex items-center justify-center pt-8;
  }
  &__logo {
    @apply relative block w-[72px] h-[72px];
  }
  &__card-body {
    @apply relative p-12;
  }

}
</style>