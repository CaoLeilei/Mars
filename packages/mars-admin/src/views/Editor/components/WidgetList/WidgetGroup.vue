<template>
  <div class="widget-group">
    <div class="widget-group__title"></div>
    <div class="widget-group__content">
=
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WidgetItem from './WidgetItem.vue';
</script>

<style lang="scss" scoped>
.widget-group {

  &__title {}
  &__body {}
}
</style>