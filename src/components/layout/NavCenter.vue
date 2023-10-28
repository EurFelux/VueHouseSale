<template>
    <div class="nav-center">
        <div class="router-link-item" v-for="route in navRoutes" :key="route.name">
            <router-link :to="route.path">{{ route.name }}</router-link>
        </div>
    </div>
</template>


<script setup lang="ts">
import { navRoutes } from '@/mixin';

</script>


<style scoped>
.nav-center {
    flex-grow: 1;
}
</style>