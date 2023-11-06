<template>
<div class="public-panel">
    <div class="heading-wrapper">
        <h2>信息发布</h2>
    </div>
    <el-tabs
        v-model="activeTab"
        type="card"
        class="tabs"
        @tab-click="handleClick"
    >
        <el-tab-pane label="出售" name="sell">
            <sell-form></sell-form>
        </el-tab-pane>

        <el-tab-pane label="出租" name="rent">
            <rent-form></rent-form>
        </el-tab-pane>

        <el-tab-pane label="求购" name="buy">
            <buy-form></buy-form>
        </el-tab-pane>

        <el-tab-pane label="求租" name="ask">
            <seek-form></seek-form>
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
     margin-bottom: 1rem;
    }
}
</style>