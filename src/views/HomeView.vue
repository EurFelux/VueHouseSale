<template>
  <div class="home-view">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :http-request="uploadImage"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    multiple
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <img :src="downloadedFileUrl" />

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>

  </div>
</template>
    
<script setup lang="ts">
import { getFileUrl, uploadFile } from '@/api/oss'

function test_1() {
  const file = ref<File>(new File([], ''))

  // uploadFile().then((res: any) => {
  //   console.log(res)
  // })
}

// example
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadRequestOptions, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const downloadedFileUrl = ref('')

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const uploadImage = async (options: UploadRequestOptions) => {
  console.log(options)
  uploadFile(options.file).then((res: any) => {
    console.log(res)
    downloadedFileUrl.value = getFileUrl(res.name)
  }).catch((err: any) => {
    console.log(err)
  })
  // const res = await uploadFile(formData)
}

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
</style>