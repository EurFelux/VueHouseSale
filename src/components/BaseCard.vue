<template>
    <div class="base-card">
        <div class="image-wrapper">
            <img :src="img" class="image" />
        </div>
        <div class="contents">
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>
        </div>
    </div>
</template>


<script setup lang="ts">
import { defaultValues } from '@/api/model';


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
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    margin-right: 1rem;
}

.image-wrapper {
    width: 100%;
    // flex-grow: 1;
    // padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.image {
    max-width: 100%;
    max-height: 100%;
}

.contents {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
</style>