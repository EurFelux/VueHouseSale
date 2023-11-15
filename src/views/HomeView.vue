<template>
  <div class="home-view">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in houses" :key="item">
          <!-- <h3 text="2xl" justify="center"> 广告位招租 </h3> -->
          <img :src="item" class="image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row>
      <el-col :span="6" class="panel">
        <h2>售房</h2>
        <ul>
          <li v-for="sell in sells" :key="sell.id">
            <el-icon>
              <chat-square />
            </el-icon>
            <el-popover :width="700" :hide-after="100" placement="top">
              <template #reference>
                <router-link :to="`/sell/${sell.id}`">
                  <el-text type="primary">{{ sell.house.location }}</el-text>
                </router-link>
              </template>
              <el-descriptions :border=true size="large" title="房屋信息">
                <el-descriptions-item label="户型">{{ sell.house.layout }}</el-descriptions-item>
                <el-descriptions-item label="面积">{{ sell.house.area }}平方米</el-descriptions-item>
                <el-descriptions-item label="朝向">{{ OrientationMap[sell.house.orientation]
                }}</el-descriptions-item>
                <el-descriptions-item label="电梯">{{ ElevatorMap[sell.house.elevator]
                }}</el-descriptions-item>
                <el-descriptions-item label="装修">{{ DecorationMap[sell.house.decoration]
                }}</el-descriptions-item>
                <el-descriptions-item label="楼层">{{ sell.house.floor }}</el-descriptions-item>
                <el-descriptions-item label="联系方式">{{ sell.contact }}</el-descriptions-item>
              </el-descriptions>
            </el-popover>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="panel">
        <h2>出租</h2>
        <ul>
          <li v-for="rent in rents">
            <el-icon>
              <chat-square />
            </el-icon>
            <el-popover :width="700" :hide-after="100" placement="top">
              <template #reference>
                <router-link :to="`/rent/${rent.id}`">
                  <el-text type="primary">{{ rent.house.location }}</el-text>
                </router-link>
              </template>
              <el-descriptions :border=true size="large" title="房屋要求">
                <el-descriptions-item label="户型">{{ rent.house.layout }}</el-descriptions-item>
                <el-descriptions-item label="面积">{{ rent.house.area }}平方米</el-descriptions-item>
                <el-descriptions-item label="朝向">{{ OrientationMap[rent.house.orientation]
                }}</el-descriptions-item>
                <el-descriptions-item label="电梯">{{ ElevatorMap[rent.house.elevator]
                }}</el-descriptions-item>
                <el-descriptions-item label="装修">{{ DecorationMap[rent.house.decoration]
                }}</el-descriptions-item>
                <el-descriptions-item label="楼层">{{ rent.house.floor }}</el-descriptions-item>
                <el-descriptions-item label="家具家电情况">{{ rent.furniture }}</el-descriptions-item>
                <el-descriptions-item label="租房方式">{{ RentTypeMap[rent.type]
                }}</el-descriptions-item>
                <el-descriptions-item label="最小租期">{{ rent.minPeriod }}个月</el-descriptions-item>
                <el-descriptions-item label="租金/月">{{ rent.price }}元</el-descriptions-item>
                <el-descriptions-item label="出租要求">{{ rent.requirement }}元</el-descriptions-item>
                <el-descriptions-item label="联系方式">{{ rent.contact }}</el-descriptions-item>
              </el-descriptions>
            </el-popover>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="panel">
        <h2>求购</h2>
        <ul>
          <li v-for="buy in buys">
            <el-icon>
              <chat-square />
            </el-icon>
            <el-popover :width="600" :hide-after="100" placement="top">
              <template #reference>
                <router-link :to="`/buy/${buy.id}`">
                  <el-text type="primary">{{ buy.location }}</el-text>
                </router-link>
              </template>
              <el-descriptions :border=true size="large" title="房屋要求">
                <el-descriptions-item label="户型">{{ buy.layout }}</el-descriptions-item>
                <el-descriptions-item label="面积">{{ buy.area }}平方米</el-descriptions-item>
                <el-descriptions-item label="预算">{{ buy.budget }}元</el-descriptions-item>
                <el-descriptions-item label="朝向">{{ OrientationMap[buy.orientation]
                }}</el-descriptions-item>
                <el-descriptions-item label="电梯">{{ ElevatorMap[buy.elevator]
                }}</el-descriptions-item>
                <el-descriptions-item label="装修">{{ DecorationMap[buy.decoration]
                }}</el-descriptions-item>
                <el-descriptions-item label="楼层">{{ buy.floor }}</el-descriptions-item>
                <el-descriptions-item label="联系方式">{{ buy.contact }}</el-descriptions-item>
              </el-descriptions>
            </el-popover>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="panel">
        <h2>求租</h2>
        <ul>
          <li v-for="seek in seeks">
            <el-icon>
              <chat-square />
            </el-icon>
            <el-popover :width="700" :hide-after="100" placement="top">
              <template #reference>
                <router-link :to="`/seek/${seek.id}`">
                  <el-text type="primary">{{ seek.location }}</el-text>
                </router-link>
              </template>
              <el-descriptions :border=true size="large" title="房屋要求">
                <el-descriptions-item label="户型">{{ seek.layout }}</el-descriptions-item>
                <el-descriptions-item label="面积">{{ seek.area }}平方米</el-descriptions-item>
                <el-descriptions-item label="装修">{{ DecorationMap[seek.decoration]
                }}</el-descriptions-item>
                <el-descriptions-item label="朝向">{{ OrientationMap[seek.orientation]
                }}</el-descriptions-item>
                <el-descriptions-item label="电梯">{{ ElevatorMap[seek.elevator]
                }}</el-descriptions-item>
                <el-descriptions-item label="楼层">{{ seek.floor }}</el-descriptions-item>
                <el-descriptions-item label="租房方式">{{ RentTypeMap[seek.type]
                }}</el-descriptions-item>
                <el-descriptions-item label="预算">{{ seek.budget }}元</el-descriptions-item>
                <el-descriptions-item label="租期">{{ seek.period }}个月</el-descriptions-item>
                <el-descriptions-item label="要求">{{ seek.requirement }}</el-descriptions-item>
                <el-descriptions-item label="联系方式">{{ seek.contact }}</el-descriptions-item>
              </el-descriptions>
            </el-popover>
          </li>
        </ul>
      </el-col>

    </el-row>
  </div>
</template>
    
<script setup lang="ts">
import { getAllBuyInfo } from '@/api/buy';
import { getAllRentInfo } from '@/api/rent';
import { getAllSeekInfo } from '@/api/seek';
import { getAllSellInfo } from '@/api/sell';
import type { SellResponse, RentResponse, BuyResponse, SeekResponse } from '@/api/response';
import { generalError } from '@/mixin';
import { ChatSquare } from '@element-plus/icons-vue/global';
import { OrientationMap, ElevatorMap, DecorationMap, RentTypeMap } from '@/api/model';

// 装点
const houses = [
  '/src/assets/images/house1.jpg',
  '/src/assets/images/house2.jpg',
  '/src/assets/images/house3.jpg',
]

// 获取数据
const sells = ref<Array<SellResponse>>([])
const rents = ref<Array<RentResponse>>([])
const buys = ref<Array<BuyResponse>>([])
const seeks = ref<Array<SeekResponse>>([])

async function getSells() {
  await getAllSellInfo().then((res) => {
    sells.value = res.data.data
  }).catch((err) => {
    generalError(err)
  })
}

async function getRents() {
  await getAllRentInfo().then((res) => {
    rents.value = res.data.data
  }).catch((err) => {
    generalError(err)
  })
}

async function getBuys() {
  await getAllBuyInfo().then((res) => {
    buys.value = res.data.data
  }).catch((err) => {
    generalError(err)
  })
}

async function getSeeks() {
  await getAllSeekInfo().then((res) => {
    seeks.value = res.data.data
  }).catch((err) => {
    generalError(err)
  })
}

// 生命周期钩子
onMounted(async () => {
  await getSells()
  await getRents()
  await getBuys()
  await getSeeks()
})

</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

h2 {
  border-bottom: 2px solid var(--el-color-primary);
  margin: 1rem 0;
}

.panel {

  ul {
    padding-left: 1rem;
  }

  li {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;

    .el-icon {
      margin-right: 0.5rem;
    }
  }

  padding: 1rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>