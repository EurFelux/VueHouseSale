<template>
<div class="audit-status">
    <el-icon>
        <component :is="icon"></component>
    </el-icon>
    <el-text>
        {{ statusText }}
    </el-text>
</div>
</template>


<script setup lang="ts">
import { AuditStatus } from '@/api/model';
import { More, Check, Close } from '@element-plus/icons-vue'

const props = defineProps({
    status: {
        type: Number,
        required: true
    }
})

const statusText = computed(() => {
    switch (props.status) {
        case AuditStatus.pending:
            return '待审核'
        case AuditStatus.approved:
            return '已通过'
        case AuditStatus.rejected:
            return '未通过'
        default:
            return '待审核' // slient error!
    }
})

const icon = computed(() => {
    switch (props.status) {
        case AuditStatus.pending:
            return More
        case AuditStatus.approved:
            return Check
        case AuditStatus.rejected:
            return Close
        default:
            return More
    }
})
</script>


<style scoped lang="scss">

</style>