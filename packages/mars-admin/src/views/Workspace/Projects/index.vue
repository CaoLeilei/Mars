<template>
  <el-container class="projects">
    <el-header class="projects__header" height="auto">
      <el-button type="primary" class="w-12" @click="handleCreateBtnClick">
        创建项目
      </el-button>
    </el-header>
    <el-main class="projects__main">
      <el-row :gutter="12">
        <el-col :span="4">
          <ProjectItemCard />
        </el-col>
        <el-col :span="4">
          <ProjectItemCard />
        </el-col>
      </el-row>
    </el-main>
    <create-project-modal v-model:visible="createModalVisible" />
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateProjectModal from './components/CreateProjectModal.vue';
import ProjectItemCard from './components/ProjectItemCard.vue';

const createModalVisible = ref<boolean>(false)

function handleCreateBtnClick() {
  createModalVisible.value = true
}

</script>

<style lang="scss" scoped>
.projects {
  @apply relative w-full h-full;

  &__header {
    @apply pl-0 pr-0 pb-4 box-border;
  }
  &__main {
    @apply p-0;
  }
}
</style>