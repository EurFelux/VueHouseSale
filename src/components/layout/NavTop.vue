<template>
    <div class="nav-top">
        <div>logo</div>
        <div class="logo-label">{{ appName }}</div>
    </div>
</template>


<script setup lang="ts">
import { appName } from '@/mixin';


</script>


<style scoped>
.nav-top {
    max-height: 10vh;
    padding: 1rem 0;
    border-bottom: 2px solid var(--color-border);
}
</style>