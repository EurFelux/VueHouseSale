<template>
    <div class="nav-item">
        <RouterLink :to="itemLink" class="nav-link">
            {{ itemText }}
        </RouterLink>
    </div>
</template>


<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';

const props = defineProps<{
    itemText: string,
    itemLink: string
}>()




</script>


<style scoped></style>