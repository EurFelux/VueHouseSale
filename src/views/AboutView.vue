<template>
  <div>
    <el-col :span="18" :offset="3" class="panel">
    <div class="about">
      <div class="about-content">
        <h1>关于</h1>
        <p>
          该项目旨在创建一个在线平台，允许学校社区成员查找、发布和管理有关房屋租赁和销售的信息。这个系统将提供方便、安全、可信的方式来满足社区成员的住房需求，并促进社区内的联系和互动。此举将有助于提升学校社区的质量和凝聚力。
        </p>
        <h2>功能</h2>
        <ul>
          <li>用户可以在平台上发布房屋租赁和销售信息。</li>
          <li>用户可以在平台上查找房屋租赁和销售信息。</li>
          <li>用户可以在平台上管理自己发布的信息。</li>
        </ul>
        <h2>技术</h2>
        <ul>
          <li>前端：Vue.js + TypeScript + Element Plus</li>
          <li>后端：Spring Boot + Spring Cloud + MySQL</li>
        </ul>
        <h2>团队</h2>
        <ul>
          <li>前端：王纪元、胡兵、张志伟</li>
          <li>后端：张赫男</li>
        </ul>
      </div>
    </div>
    </el-col>
    
  </div>
</template>

<script setup lang="ts">

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

<style scoped lang="scss">
.panel {
    padding: 2rem;
    background: rgba(var(--color-bg-4), 0.5);
    backdrop-filter: blur(6px);
}
</style>
