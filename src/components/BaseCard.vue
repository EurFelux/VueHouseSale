<template>
    <div class="base-card">
        <el-row>
            <el-col :span="6">
                <img :src="image" />
            </el-col>
            
            <el-col :span="contents_span">
                <div class="card-content">
                    <h2>{{ title }}</h2>
                    <p>{{ description }}</p>
                </div>
            </el-col>
            
            <el-col :span="extra_span">
                <slot name="extra-content"></slot>
            </el-col>
            
        </el-row>
        
    </div>
</template>


<script setup lang="ts">

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
    }
})

const slots = useSlots();

const contents_span = computed(() => {
    if (slots.extraContent) {
        return 12
    } else {
        return 18
    }
})

const extra_span = computed(() => {
    if (slots.extraContent) {
        return 6
    } else {
        return 0
    }
})

</script>


<style scoped lang="scss">

</style>