<template>
    <el-form>
        <div class="form-wrapper">
            <el-form :model="updateSellForm" label-width="auto" :rules="rules" ref="updateSellFormRef">
                <!-- 房产 -->
                <el-form-item label="房产">
                    <p>{{ props.origin?.house.location }}</p>
                </el-form-item>

                <!-- 房屋图片 -->
                <el-form-item label="房屋图片" prop="pic">
                    <el-upload v-model:file-list="fileList"
                        :on-change="handleChange"
                        :on-success="handleSuccess"
                        :http-request="uploadImage"
                        list-type="picture"
                        multiple
                        >
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
                <!-- 描述 -->
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="updateSellForm.description" placeholder="请输入描述"></el-input>
                </el-form-item>
                <!-- 价格 -->
                <el-form-item label="价格" prop="price">
                    <el-input type="number" v-model.number="updateSellForm.price" placeholder="请输入价格"></el-input>
                </el-form-item>
                <!-- 联系方式 -->
                <el-form-item label="联系方式" prop="contact">
                    <el-input type="text" v-model="updateSellForm.contact" placeholder="请输入联系方式"></el-input>
                </el-form-item>
            </el-form>
            <div class="button-wrapper">
                <el-button class="submit-button" round @click="submitSell(updateSellFormRef)">提交</el-button>
                <el-button @click="console.log(updateSellForm)" v-if="publicStore.debug">show form</el-button>
            </div>
        </div>
    </el-form>
</template>


<script setup lang="ts">
import { getAuditedAuditsByUser } from '@/api/audit';
import { OwnershipType, Decoration, Elevator, Orientation, type House } from '@/api/model';
import type { SellForm, UpdateSellForm } from '@/api/request';
import { addSellInfo, updateSellInfo } from '@/api/sell';
import { allRules, generalError } from '@/mixin';
import { useUserStore } from '@/stores/user';
import { usePublicStore } from '@/stores/public';

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
import { uploadFile } from '@/api/oss';
const fileList = ref<UploadUserFile[]>([])

const handleSuccess = (response: any, uploadFile: UploadUserFile, uploadFiles: UploadUserFile[]) => {
    updateSellForm.pic += response.name + ';'
}

const uploadImage = async (options: UploadRequestOptions) => {
    return uploadFile(options.file)
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    if (fileList.value.length > 9)
        fileList.value = fileList.value.slice(-9)
}


// 提交表单
const updateSellFormRef = ref<FormInstance>()

const updateSellForm = reactive<UpdateSellForm>({
    id: props.origin?.id ?? -1,
    price: props.origin?.price ?? 0,
    pic: '',
    description: props.origin?.description ?? '',
    contact: props.origin?.contact ?? userStore.phone,
})

const rules = reactive<FormRules<SellForm>>({
    description: allRules.description,
    price: allRules.price,
    contact: allRules.phone,

})

function resetForm() {
    updateSellForm.pic = ''
    updateSellForm.description = ''
    
}

async function submitSell(formEl: FormInstance | undefined) {

    if (!formEl) return;

    await formEl.validate(async (valid, fileds) => {
        if (valid) {
            await updateSellInfo(updateSellForm).then((res) => {
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