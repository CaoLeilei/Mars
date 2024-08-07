<template>
  <div class="editor-view">
    <!-- <component></component> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '@/store'

const editorStore = useEditorStore()
console.log('editorStore:', editorStore)
</script>

<style lang="scss" scoped>
.editor-view {
  @apply bg-white h-full
}

.editor-view.mobile {
  width: 375px;
}
</style>