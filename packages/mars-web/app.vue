<template>
  <div :class="['app', `theme-${appStore.theme}`]">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
  <!-- <NuxtRouteAnnouncer /> -->
  <!-- <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div> -->
</template>

<script setup lang="ts">
import { useAppStore } from './stores';
const appStore = useAppStore();
console.log(appStore.theme);

</script>

<style scoped>
.app {
  @apply relative w-full;
  min-height: 100vh;
}
</style>