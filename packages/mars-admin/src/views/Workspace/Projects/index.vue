<template>
  <el-container class="projects">
    <el-header class="projects__header" height="40px">
      <el-button type="primary" class="w-12" @click="handleCreateBtnClick">创建项目</el-button>
    </el-header>
    <el-main class="projects__main">
      <el-row :gutter="12">
        <el-col></el-col>
      </el-row>
    </el-main>
    <create-project-modal v-model:visible="createModalVisible"></create-project-modal>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateProjectModal from './components/CreateProjectModal.vue';
import { create } from 'lodash';

const createModalVisible = ref<boolean>(false)

function handleCreateBtnClick() {
  createModalVisible.value = true
}

</script>

<style lang="scss" scoped>
.projects {
  @apply relative w-full h-full;

  &__header {
    @apply pl-0 pr-0;
  }
  &__main {
    @apply p-0;
  }
}
</style>