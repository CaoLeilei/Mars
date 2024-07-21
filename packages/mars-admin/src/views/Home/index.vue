<template>
  <Layout>
    <template #aside>HomeMenu</template>
  </Layout>
</template>

<script setup lang="ts">
import { RouterView  } from 'vue-router';
import Layout from '@/components/Layouts/index.vue';
import HomeMenu from './Layouts/HomeMenu.vue';

</script>

<style lang="scss" scoped>

</style>