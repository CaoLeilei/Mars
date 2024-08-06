<template>
  <el-card size="small" class="project-card">
    <div>
      <h2 class="project-card__title">项目名称</h2>
      <p class="project-card__desc">项目描述</p>
    </div>

    <template #footer>
      <div class="project-card__footer">
        <div class="project-card__footer-item">
          <el-button text class="project-card__footer-button">删除</el-button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="project-card__footer-item">
          <el-button text class="project-card__footer-button">查看</el-button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="project-card__footer-item">
          <el-button text class="project-card__footer-button">编辑</el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return null
    },
  },
})

const handleDeleteBtnClick = () => {
  if (props.data) {
    console.log(props.data)
  }
}

const handleInfoBtnClick = () => {
  if (props.data) {
    console.log(props.data)
  }
}

const handleEditBtnClick = () => {
  if (props.data) {
    // 进行路由的跳转
    router.push({ path: '/editor' });
  }
}

</script>

<style lang="scss" scoped>
.project-card {
  @apply relative w-full;

  &__title {
    @apply text-lg font-bold mb-2 line-clamp-1;
  }
  &__desc {
    @apply text-sm text-gray-500 line-clamp-3;
  }

  &__footer {
    @apply flex justify-between pt-2 pb-2;
  }
  ::v-deep(.ep-card__body) {
    @apply p-4 leading-6;
  }
  ::v-deep(.ep-card__footer) {
    @apply pt-0 pb-0;
  }
}
</style>