<template>
    <div class="request-panel">

        <!-- 主界面 -->
        <el-row class="request-heading">
            <el-col :span="24">
                <el-collapse>
                    <el-collapse-item name="audit-form">
                        <template #title>
                            <div class="heading-wrapper">
                                <h2>提交申请</h2>
                            </div>
                        </template>
                        <div class="form-wrapper">
                            <el-form :model="auditForm" label-width="auto" :rules="rules" ref="auditFormRef">
                                <el-form-item label="身份证号" prop="identification">
                                    <el-input placeholder="请输入身份证号" v-model="auditForm.identification" required></el-input>
                                </el-form-item>
                                <el-form-item label="真实姓名" prop="realName">
                                    <el-input placeholder="请输入真实姓名" v-model="auditForm.realName" required></el-input>
                                </el-form-item>
                                <el-form-item label="房产证编号" prop="house.houseId">
                                    <el-input placeholder="请输入房产证编号" v-model="auditForm.house.houseId" required></el-input>
                                </el-form-item>
                                <el-form-item label="房屋产权" prop="house.ownershipType">
                                    <el-radio-group v-model="auditForm.house.ownershipType">
                                        <el-radio :label="OwnershipType.Public">公产</el-radio>
                                        <el-radio :label="OwnershipType.Private">私产</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="房屋地址" prop="house.location">
                                    <el-input placeholder="请输入房屋地址" v-model="auditForm.house.location" required></el-input>
                                </el-form-item>
                                <el-form-item label="户型" prop="house.layout">
                                    <el-input placeholder="请输入户型" v-model="auditForm.house.layout" required></el-input>
                                </el-form-item>
                                <el-form-item label="朝向" prop="house.orientation">
                                    <el-select v-model="auditForm.house.orientation" placeholder="请选择朝向" required>
                                        <el-option
                                            v-for="item in orientationItems"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="房屋面积" prop="house.area">
                                    <el-input placeholder="请输入房屋面积（平方米）" v-model.number="auditForm.house.area" required></el-input>
                                </el-form-item>
                                <el-form-item label="装修情况" prop="house.decoration">
                                    <el-radio-group v-model="auditForm.house.decoration">
                                        <el-radio :label="Decoration.Simple">简装</el-radio>
                                        <el-radio :label="Decoration.Fine">精装</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="楼层" prop="house.floor">
                                    <el-input placeholder="请输入楼层" v-model="auditForm.house.floor" required></el-input>
                                </el-form-item>
                                <el-form-item label="电梯" prop="house.elevator">
                                    <el-radio-group v-model="auditForm.house.elevator">
                                        <el-radio :label="Elevator.Yes">有</el-radio>
                                        <el-radio :label="Elevator.No">无</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                            <div class="button-wrapper">
                                <el-button class="submit-button" round @click="submitAudit(auditFormRef)">提交</el-button>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>


            </el-col>

            <el-col :span="24">
                <div class="heading-wrapper">
                    <h2>已提交的申请</h2>
                    <div style="flex-grow: 1"></div>
                </div>
            </el-col>
        </el-row>
        <el-row class="request-list">
            <el-col :span="24">
                <div v-if="drawer">
                    <el-empty description="没有已提交的申请"></el-empty>
                </div>
                <el-descriptions :title="audit.house.location" v-for="audit in audits">
                    <el-descriptions-item label="房产证编号">
                        {{ audit.house.houseId }}
                    </el-descriptions-item>
                    
                    <el-descriptions-item label="房屋地址">
                        {{ audit.house.location }}
                    </el-descriptions-item>
                    
                    <el-descriptions-item label="审核状态">
                        <el-tag type="info" v-if="audit.status == AuditStatus.pending">待审核</el-tag>
                        <el-tag type="success" v-if="audit.status == AuditStatus.approved">已通过</el-tag>
                        <el-tag type="danger" v-if="audit.status == AuditStatus.rejected">已拒绝</el-tag>
                    </el-descriptions-item>
                </el-descriptions>

            </el-col>
        </el-row>
    </div>
</template>


<script setup lang="ts">
import { type Audit, OwnershipType, Decoration, Elevator, Orientation, AuditStatus } from '@/api/model';
import type { AuditRequestForm } from '@/api/request';
import { addAudit, getAuditsByUser } from '@/api/audit';
import { useUserStore } from '@/stores/user';
import { allRules, generalError } from '@/mixin';
import type { FormRules, FormInstance } from 'element-plus';

const userStore = useUserStore();

// 获取数据
const audits = ref<Audit[]>([])

function getAudits() {
    getAuditsByUser(userStore.id).then((res) => {
        audits.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

onMounted(() => {
    getAudits()
})

// 提交新审核
const drawer = ref(false)
const orientationItems = [
    { value: Orientation.East, label: '东' },
    { value: Orientation.South, label: '南' },
    { value: Orientation.West, label: '西' },
    { value: Orientation.North, label: '北' },
    { value: Orientation.EastSouth, label: '东南' },
    { value: Orientation.EastNorth, label: '东北' },
    { value: Orientation.WestSouth, label: '西南' },
    { value: Orientation.WestNorth, label: '西北' },
    { value: Orientation.EastWest, label: '东西' },
    { value: Orientation.SouthNorth, label: '南北' },
    { value: Orientation.Unknown, label: '未知' },
]

const auditFormRef = ref<FormInstance>()

const auditForm = reactive<AuditRequestForm>({
    userId: 0,
    identification: '',
    realName: '',
    house: {
        houseId: '000000000',
        ownershipType: OwnershipType.Public,
        location: '',
        area: 0,
        decoration: Decoration.Any,
        floor: '1F',
        elevator: Elevator.Any,
        orientation: Orientation.East,
        layout: '一室一厅',
    },
})

const rules = reactive<FormRules<AuditRequestForm>>({
    identification: allRules.identification,
    realName: allRules.realName,
    'house.ownershipType': allRules.ownershipType,
    'house.location': allRules.houseLocation,
    'house.area': allRules.area,
    'house.decoration': allRules.decoration,
    'house.floor': allRules.floor,
    'house.elevator': allRules.elevator,
    'house.orientation': allRules.orientation,
    'house.layout': allRules.layout,
    'house.houseId': allRules.houseId,
})

function resetAuditForm() {
    // auditForm.identification = ''
    // auditForm.realName = ''
    auditForm.house.houseId = '000000000'
    auditForm.house.ownershipType = OwnershipType.Public
    auditForm.house.location = ''
    auditForm.house.area = 0
    auditForm.house.decoration = Decoration.Any
    auditForm.house.floor = '1F'
    auditForm.house.elevator = Elevator.Any
    auditForm.house.orientation = Orientation.East
    auditForm.house.layout = ''
}

async function submitAudit(formEl: FormInstance | undefined) {

    if (!formEl) return;

    auditForm.userId = userStore.id
    await formEl.validate((valid, fileds) => {
        if (valid) {
            addAudit(auditForm).then((res) => {
                ElMessage.success('提交成功')
                resetAuditForm()
                getAudits()
            }).catch((err) => {
                generalError(err)
            })
        }
    })
}


</script>


<style scoped lang="scss">
.heading-wrapper {
    // color: var(--color-text-on-glass);
    
    font-size: 1rem;
    text-shadow: 1px 1px 0 var(--color-text-shadow);

    h2 {
     border-bottom: 1px solid var(--color-text-on-glass);;   
    }
}

.form-wrapper {
    padding: 2rem;
}

.el-collapse {
    
    --el-collapse-header-bg-color: transparent;
    --el-collapse-content-bg-color: var(--color-bg-glass);
    border-top: 0;
    background-color: transparent;
    margin-bottom: 1rem;
}

.button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

}

button > .heading-wrapper > h2 {
    border-bottom: 0;
}
</style>