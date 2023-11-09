<template>
    <div class="manage-audit-panel">
        <h2>房产资质审核</h2>
        <el-collapse>
            <el-collapse-item v-for="audit in audits" :key="audit.id">
                <template #title>
                    <h2>房产证号：{{ audit.house.houseId }}</h2>
                </template>
                <div class="details-wrapper">
                    <p>审核ID: {{ audit.id }}</p>
                    <p>提交日期: {{ audit.submissionDate }}</p>
                    <h3>用户信息</h3>
                    <el-descriptions :border=true>
                        <el-descriptions-item label="ID">{{ audit.userId }}</el-descriptions-item>
                        <el-descriptions-item label="姓名">{{ audit.realName }}</el-descriptions-item>
                        <el-descriptions-item label="身份证号">{{ audit.identification }}</el-descriptions-item>
                    </el-descriptions>
                    <h3>房产信息</h3>
                    <el-descriptions :border=true>
                        <el-descriptions-item label="房产证号">{{ audit.house.houseId }}</el-descriptions-item>
                        <el-descriptions-item label="产权类型">{{ audit.house.ownershipType }}</el-descriptions-item>
                        <el-descriptions-item label="地址">{{ audit.house.location }}</el-descriptions-item>
                        <el-descriptions-item label="装修">{{ audit.house.decoration }}</el-descriptions-item>
                        <el-descriptions-item label="户型">{{ audit.house.layout }}</el-descriptions-item>
                        <el-descriptions-item label="朝向">{{ audit.house.orientation }}</el-descriptions-item>
                        <el-descriptions-item label="楼层">{{ audit.house.floor }}</el-descriptions-item>
                        <el-descriptions-item label="电梯">{{ audit.house.elevator }}</el-descriptions-item>
                        <el-descriptions-item label="面积">{{ audit.house.area }}</el-descriptions-item>
                    </el-descriptions>
                    <h3>审核意见</h3>
                    <el-form :model="audit.form" label-width="80px" :rules="rules" :ref="(el: FormInstance , item: number) => {audit.formRef = el}">
                        <el-form-item label="审核结果" prop="status">
                            <el-radio-group v-model="audit.form.status">
                                <el-radio-button :label="AuditStatus.approved">{{ AuditStatusText.approved
                                }}</el-radio-button>
                                <el-radio-button :label="AuditStatus.rejected">{{ AuditStatusText.rejected
                                }}</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="审核意见" prop="comment">
                            <el-input type="textarea" :rows="5" v-model="audit.form.comment"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitAudit(audit.formRef, audit.form)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-collapse-item>

        </el-collapse>

    </div>
</template>


<script setup lang="ts">
import { getAllNotAuditedAudits, setAudit } from '@/api/audit';
import { AuditStatus, type Audit, AuditStatusText } from '@/api/model';
import type { AuditForm } from '@/api/request';
import { DatetimeStringToFormatedString } from '@/mixin';

const userStore = useUserStore()

interface AuditWithForm extends Audit {
    form: AuditForm
    formRef: FormInstance | undefined
}

const audits = ref<Array<AuditWithForm>>([])

function getAudits() {
    getAllNotAuditedAudits().then((res) => {
        audits.value = res.data.data.map((item) => {
            return {
                id: item.id,
                userId: item.userId,
                submissionDate: DatetimeStringToFormatedString(item.submissionDate),
                status: item.status,
                adminId: item.adminId,
                verificationDate: '',
                comment: item.comment,
                identification: item.identification,
                realName: item.realName,
                house: item.house,
                form: {
                    id: item.id,
                    adminId: item.adminId,
                    status: AuditStatus.pending,
                    comment: ''
                },
                formRef: undefined
            }
        })
    })
}

onMounted(() => {
    getAudits()
})

// 验证表单
import { type FormInstance, type FormRules } from 'element-plus';
import { allRules, generalError } from '@/mixin';
import { useUserStore } from '@/stores/user';

const rules = reactive<FormRules<AuditForm>>({
    status: allRules.auditStatus,
    comment: allRules.auditComment
})

// 提交表单
async function submitAudit(formEl: FormInstance | undefined, form: AuditForm) {

    // console.log('formEl', formEl)
    
    if (!formEl) return;

    form.adminId = userStore.id

    await formEl.validate((valid, fileds) => {
        if (valid) {
            setAudit(form).then((res) => {
                ElMessage.success('提交成功')
                getAudits()
            }).catch((err) => {
                generalError(err)
            })
        }
    });
}


</script>

<style scoped lang="scss">
h2 {
    margin: 10px 0;
    // border-bottom: 1px solid var(--el-text-color-regular);
}

.el-collapse {
    h2 {
        margin: 10px 0;
        padding: 1rem;
    }
}

.details-wrapper {
    padding: 10px;
    margin: 10px 0;

    h3 {
        margin: 10px 0;
        border-bottom: 1px solid #eee;
        border-radius: 2px;
    }
}
</style>