<template>
  <ElContainer class="relative w-full h-full">
    <ElAside width="w-12">
      <div class="AppsAside">
        <div class="Header"></div>
        <div class="Footer"></div>
      </div>
    </ElAside>
    <ElContainer>
      <ElHeader class="AppsHeader"></ElHeader>
      <ElMain>
        <div class="AppContainer">
          <AppList />
        </div>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script setup lang="ts">
import AppList from './Components/HomeApps/AppList.vue'

</script>

<style lang="scss" scoped>
.HomeApps {
  position: relative;
  height: 100%;
}
.AppsAside {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #e6e8eb;
  box-sizing: border-box;
  .Header {
    position: relative;
  }
  .Footer {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 53px;
    box-sizing: border-box;
    border-top: 1px solid #e6e8eb;

  }
}
.AppsHeader {
  background: #ffffff;
  border-bottom: 1px solid #e6e8eb;
}
.AppContainer {
}
</style>