<template>
    <div class="base-card">
        <div class="image-wrapper">
            <el-image :src="img" class="image" fit="cover">
                <template #error>
                    <image-fail />
                </template>
            </el-image>
        </div>
        <div class="contents">
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>
        </div>
    </div>
</template>


<script setup lang="ts">
import ImageFail from '@/components/ImageFail.vue'

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
const img = computed(() => {
    if (props.image) {
        return props.image
    } else {
        return ''
    }
})

const contents_span = computed(() => {
    if (slots.extraContent) {
        return 14
    } else {
        return 20
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
.base-card {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;

    height: auto;
    width: 200px;

    background-color: var(--color-bg-glass);
    border-radius: 1rem;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

    margin-right: 1rem;
    transition: all 0.3s;
}

.base-card:hover {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

.image-wrapper {
    height: 100px;
    // width: 100%;
    // flex-grow: 1;
    // padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    border-radius: 1rem 1rem 0 0;
}

.image {
    width: 100%;
    height: 100%;
}

.contents {
    background-color: var(--color-bg-6);
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border-radius: 0 0 1rem 1rem;
}
</style>