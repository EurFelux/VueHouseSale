<template>
    <el-form>
        <div class="form-wrapper">
            <el-form :model="updateRentForm" label-width="auto" :rules="rules" ref="rentFormRef">
                <!-- 房产 -->
                <el-form-item label="房产">
                    <p>{{ props.origin?.house.location }}</p>
                </el-form-item>

                <!-- 租房类型 -->
                <el-form-item label="租房类型" prop="rentType">
                    <el-radio-group v-model="updateRentForm.type">
                        <el-radio-button :label="RentType.Any">不限</el-radio-button>
                        <el-radio-button :label="RentType.Entire">整租</el-radio-button>
                        <el-radio-button :label="RentType.Joint">合租</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <!-- 房屋图片 -->

                <el-form-item label="房屋图片" prop="pic">
                    <el-upload v-model:file-list="fileList" :on-change="handleChange" :on-success="handleSuccess"
                        :http-request="uploadImage" list-type="picture" multiple>
                        <el-button type="primary">上传图片</el-button>
                        <template #tip>
                            <div class="el-upload__tip">
                                <p>
                                    jpg/png files with a size less than 3MB
                                </p>
                                <p>最多上传9张图片</p>
                            </div>
                        </template>
                    </el-upload>

                </el-form-item>

                <!-- 最短租期 -->
                <el-form-item label="最短租期/月" prop="minPeriod">
                    <el-input type="number" v-model.number="updateRentForm.minPeriod" placeholder="请输入最短租期"></el-input>
                </el-form-item>

                <!-- 家具 -->
                <el-form-item label="家具家电情况" prop="furniture">
                    <el-input type="text" v-model="updateRentForm.furniture" placeholder="请输入家具家电情况"></el-input>
                </el-form-item>

                <!-- 出租要求 -->
                <el-form-item label="出租要求" prop="requirement">
                    <el-input type="text" v-model="updateRentForm.requirement" placeholder="请输入对租客的要求"></el-input>
                </el-form-item>



                <!-- 描述 -->
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="updateRentForm.description" placeholder="请输入描述"></el-input>
                </el-form-item>
                <!-- 租金 -->
                <el-form-item label="租金/月" prop="price">
                    <el-input type="number" v-model.number="updateRentForm.price" placeholder="请输入租金"></el-input>
                </el-form-item>
                <!-- 联系方式 -->
                <el-form-item label="联系方式" prop="contact">
                    <el-input type="text" v-model="updateRentForm.contact" placeholder="请输入联系方式"></el-input>
                </el-form-item>
            </el-form>
            <div class="button-wrapper">
                <el-button class="submit-button" round @click="submitRent(rentFormRef)">提交</el-button>
                <el-button @click="console.log(updateRentForm)" v-if="publicStore.debug">show form</el-button>
            </div>
        </div>
    </el-form>
</template>


<script setup lang="ts">
import { getAuditedAuditsByUser } from '@/api/audit';
import { type House, RentType } from '@/api/model';
import { addRent, updateRentInfoById } from '@/api/rent';
import type { UpdateRentForm, SellForm } from '@/api/request';
import { allRules, generalError } from '@/mixin';
import { useUserStore } from '@/stores/user';
import type { FormInstance, FormRules, UploadProps, UploadRequestOptions, UploadUserFile } from 'element-plus';

const publicStore = usePublicStore()
const userStore = useUserStore()
const props = defineProps({
    origin: {
        type: Object,
    }
})
const emit = defineEmits(['success'])

// 上传图片
import { getFileUrl, uploadFile } from '@/api/oss';
import { usePublicStore } from '@/stores/public';
const fileList = ref<UploadUserFile[]>([])

const handleSuccess = (response: any, uploadFile: UploadUserFile, uploadFiles: UploadUserFile[]) => {
    updateRentForm.pic += response.name + ';'
}

const uploadImage = async (options: UploadRequestOptions) => {
    return uploadFile(options.file)
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    if (fileList.value.length > 9)
        fileList.value = fileList.value.slice(-9)
}


// 提交表单
const rentFormRef = ref<FormInstance>()

const updateRentForm = reactive<UpdateRentForm>({
    id: props.origin?.id ?? -1,
    type: props.origin?.type ?? RentType.Unknown,
    description: props.origin?.description ?? '',
    price: props.origin?.price ?? 0,
    contact: props.origin?.contact ?? userStore.phone,
    minPeriod: props.origin?.minPeriod ?? 0,
    furniture: props.origin?.furniture ?? '',
    requirement: props.origin?.requirement ?? '',
    pic: '',
})



const rules = reactive<FormRules<UpdateRentForm>>({
    description: allRules.description,
    price: allRules.price,
    contact: allRules.phone,
    minPeriod: allRules.minPeriod,
    furniture: allRules.furniture,
    type: allRules.rentType,



})

function resetForm() {
    updateRentForm.pic = ''
}

async function submitRent(formEl: FormInstance | undefined) {

    if (!formEl) return;

    await formEl.validate(async (valid, fileds) => {
        if (valid) {
            await updateRentInfoById(updateRentForm).then((res) => {
                ElMessage.success('提交成功')
                resetForm()
                emit('success')
            }).catch((err) => {
                generalError(err)
            })
        }
    })
}
</script>


<style scoped lang="scss">
.button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

}
</style>