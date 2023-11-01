<template>
  <div>
    <el-button @click="test">test</el-button>
  </div>
</template>

<script setup lang="ts">
import { changeActiveIndex } from '@/mixin'

function test() {
  ElMessage.info("无事发生")
}

</script>

<style>
@media (min-width: 1024px) {
  .about {
    max-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
