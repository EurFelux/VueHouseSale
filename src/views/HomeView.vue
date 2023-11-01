<template>
  <div class="home-view">
    <div class="home-view__content">
      <h1>Home</h1>
      <p>Home content</p>
      <el-button @click="test">test</el-button>
    </div>
  </div>
</template>
    
<script setup lang="ts">
import { changeActiveIndex } from '@/mixin';

// import { ElMessage } from 'element-plus';


function test() {
  ElMessage.info('无事发生')
}

</script>
