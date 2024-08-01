<template>
  <div></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 数据库列表
const datebaseList = ref<any[]>([])

function fetchDatebaseList() {
  // 获取数据库列表
  fetch('/api/database/list').then(res => {
    res.json().then(data => {
      datebaseList.value = data.data
    })
  })
}

// 页面出事话
onMounted(() => {
  fetchDatebaseList()
})

</script>

<style lang="scss" scoped>

</style>