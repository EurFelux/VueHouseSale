const bucketHost = 'krypton-picbed.oss-cn-chengdu.aliyuncs.com'
const bucketName = 'krypton-picbed'
const region = 'oss-cn-chengdu'
const accessKeyId = 'LTAI5t76X4YpVn3JMKZC28Zg'
const accessKeySecret = 'aiq0TzuKx80VVLfgmlhorLxMeaDL5n'
const dir = 'img/house/'

import OSS from 'ali-oss'

const client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket: bucketName,
})

export function uploadFile(file: File): Promise<OSS.PutObjectResult> {
    
    return client.put(`${dir}${file.name}`, file)
}