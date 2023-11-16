<template>
    <div class="public-panel">
        <div class="heading-wrapper">
            <h2>信息发布</h2>
        </div>
        <el-tabs v-model="activeTab" type="card" class="tabs" @tab-click="handleClick">
            <el-tab-pane label="出售" name="sell">
                <div class="form-wrapper">
                    <sell-form></sell-form>
                </div>
            </el-tab-pane>

            <el-tab-pane label="出租" name="rent" lazy>
                <div class="form-wrapper">
                    <rent-form></rent-form>
                </div>
            </el-tab-pane>

            <el-tab-pane label="求购" name="buy" lazy>
                <div class="form-wrapper">
                    <buy-form></buy-form>
                </div>
            </el-tab-pane>

            <el-tab-pane label="求租" name="ask" lazy>
                <div class="form-wrapper">
                    <seek-form></seek-form>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
import SellForm from '../forms/SellForm.vue';
import RentForm from '../forms/RentForm.vue';
import BuyForm from '../forms/BuyForm.vue';
import SeekForm from '../forms/SeekForm.vue';

const activeTab = ref('sell')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab)
    activeTab.value = tab.paneName as string
}

</script>


<style scoped lang="scss">
.heading-wrapper {
    // color: var(--color-text-on-glass);

    font-size: 1rem;
    text-shadow: 1px 1px 0 var(--color-text-shadow);

    h2 {
        margin: 1rem 0;
        border-bottom: 2px solid var(--el-color-primary);
    }
}

.form-wrapper {
    padding: 2rem;
    border-radius: 1rem;
    background-color: var(--color-bg-6);
}


:deep(.el-tabs__item.is-active) {
    background-color: #fff;
    transition: all 0.5s;
}
</style>