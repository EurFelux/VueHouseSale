<template>
    <base-card :title="title" :description="description" :image="image">
    <template #extra-content>
        <audit-status-result :status="status"></audit-status-result>
    </template>
    </base-card>
</template>


<script setup lang="ts">
import BaseCard from './BaseCard.vue';
import AuditStatusResult from './AuditStatusResult.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    status: {
        type: Number,
        required: true
    }
})

</script>


<style scoped lang="scss"></style>