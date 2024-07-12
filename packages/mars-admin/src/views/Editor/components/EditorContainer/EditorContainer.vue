<template>
  <div class="editor-container">
    <EditorView />
  </div>
</template>

<script setup lang="ts">
import EditorView from './EditorView.vue'

</script>

<style lang="scss" scoped>
.editor-container {
  @apply relative flex w-full h-full justify-center items-start
}
</style>