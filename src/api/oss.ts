const bucketHost = 'krypton-picbed.oss-cn-chengdu.aliyuncs.com'
const bucketName = 'krypton-picbed'
const region = 'oss-cn-chengdu'
const accessKeyId = ''
const accessKeySecret = ''
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

export function getFileUrl(file: string): string {
    return client.signatureUrl(file)
}

