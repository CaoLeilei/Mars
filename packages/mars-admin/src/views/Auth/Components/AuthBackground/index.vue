<template>
  <div class="auth-background">
    <div data-name="authTop" class="auth-background__top">
      <corner-top />
    </div>
    <div data-name="authBottom" class="auth-background__bottom">
      <corner-bottom />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
// import { getColorPalette } from '@/utils';
// import { CornerBottom, CornerTop } from './components';
// absolute -right-300px -top-900px <sm:(-right-100px -top-1170px)

// absolute -left-200px -bottom-400px <sm:(-left-100px -bottom-760px)
import CornerTop from './CornerTop.vue'
import CornerBottom from './CornerBottom.vue'

interface Props {
  /** 主题颜色 */
  themeColor: string;
}

const props = defineProps<Props>();

// const lightColor = computed(() => getColorPalette(props.themeColor, 3));
// const darkColor = computed(() => getColorPalette(props.themeColor, 6));
</script>

<style scoped lang="scss">
.auth-background {
  @apply absolute top-0 left-0 z-0 w-full h-full overflow-hidden;
  background: #dfe4fe;

  &__top {
    @apply absolute;
    right:  -300px;
    top: -900px;
  }
  &__bottom {
    @apply absolute;
    left: -200px;
    bottom: -400px;
  }
}
</style>

