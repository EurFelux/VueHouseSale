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
// import { ElMessage } from 'element-plus';


function test() {
  ElMessage.error({message: "test" ,duration: 50000});
}

</script>
