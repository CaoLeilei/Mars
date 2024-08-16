<template>
  <div class="search-list">
    <el-row>
      <el-col span="8">
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import WidgetItem from './WidgetItem.vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  }
})



</script>

<style lang="scss" scoped>
.search-list {
  @apply relative
}
</style>