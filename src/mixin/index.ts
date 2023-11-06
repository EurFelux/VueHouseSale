// 应用名
export const appName: string = "House App";

// DEBUG 版本
export const debugVersion: string = '11/7'


// 跳转路由
import { routesMap } from '@/router';
import { usePublicStore } from '@/stores/public'

export function changeActiveIndex(path: string) {
  const publicStore = usePublicStore()
  switch (path) {
    case routesMap.home.path:
      publicStore.activeIndex = routesMap.home.path
      break
    case routesMap.about.path:
      publicStore.activeIndex = routesMap.about.path
      break
    case routesMap.login.path:
      publicStore.activeIndex = routesMap.login.path
      break
    case routesMap.register.path:
      publicStore.activeIndex = routesMap.register.path
      break
    default:
      ;
  }
}

// 报错
import type { AxiosResponse } from 'axios';
import type { AnyDataResponse } from '@/api/response';
import { Decoration, OwnershipType } from '@/api/model';

function httpError(res: AxiosResponse<any>) {
  ElMessage.error(`HTTP 错误：${res.status} ${res.statusText}`)
}

function serverError(res: AxiosResponse<AnyDataResponse>) {
  ElMessage.error(`错误：${res.data.message}`)
}

function normalError(message: string) {
  ElMessage.error(message)
}

export function generalError(err: any) {
  if (err.response) {
    if (err.response.data.message)
      serverError(err.response)
    else
      httpError(err.response)
  } else {
    normalError(err)
  }
}


// 验证规则
export const allRules = {
  // 用户名
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度应为2-20位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]{2,20}$/, message: '用户名只能包含字母、数字、下划线和连字符', trigger: 'blur' },
  ],
  // 密码
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应为6-20位', trigger: 'blur' },
    { pattern: /^[A-Za-z\d@#$!%*?&]{6,20}$/, message: '密码只能包含字母、数字和特殊字符@#$!%*?&', trigger: 'blur' },
  ],
  // 手机号
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { len: 11, message: '手机号长度应为11位', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
  ],
  // 性别
  sex: [
    {
      validator: (rule: any, value: number, callback: any) => {
        if (value === -1) {
          callback(new Error('请选择性别'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ],
  // 年龄
  age: [],
  // 地址
  location: [],
  // 个人简介
  introduction: [
    { min: 0, max: 100, message: '个人简介长度应为0-100位', trigger: 'blur' }
  ],
  // 真实姓名
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '真实姓名长度应为2-10个字符之间', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5]{2,10}$/, message: '真实姓名只能包含中文', trigger: 'blur' },
  ],
  // 身份证号
  identification: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { len: 18, message: '身份证号长度应为18位', trigger: 'blur' },
    { pattern: /^\d{17}[\dXx]$/, message: '身份证号格式不正确', trigger: 'blur' },
  ],
  // 房屋
  // 产权
  ownershipType: [
    { required: true, message: '请选择产权', trigger: 'blur' },
    {
      validator: (rule: any, value: number, callback: any) => {
        if (value === -1) {
          callback(new Error('请选择产权'));
        } else if (value !== OwnershipType.Public && value !== OwnershipType.Private) {
          callback(new Error('产权只能为公产或私产'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ],
  // 装修情况
  decoration: [
    { required: true, message: '请选择装修情况', trigger: 'blur' },
    {
      validator: (rule: any, value: number, callback: any) => {
        if (value === -1) {
          callback(new Error('请选择装修情况'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ],
  // 户型
  layout: [
    { required: true, message: '请输入户型', trigger: 'blur' },
    { min: 1, max: 10, message: '长度应为1-10个字符之间', trigger: 'blur' },
  ],
  // 朝向
  orientation: [
    {
      validator: (rule: any, value: number, callback: any) => {
        if (value === -1) {
          callback(new Error('请选择朝向'));
        } else {
          callback();
        }
      }
    }
  ],
  // 楼层
  floor: [
    { required: true, message: '请输入楼层', trigger: 'blur' },
    { min: 1, max: 10, message: '长度应为1-10个字符之间', trigger: 'blur' },
  ],
  // 有无电梯
  elevator: [
    { required: true, message: '请选择有无电梯', trigger: 'blur' },
    {
      validator: (rule: any, value: number, callback: any) => {
        if (value === -1) {
          callback(new Error('请选择有无电梯'));
        } else {
          callback();
        }
      }
    }
  ],
  // 面积
  area: [
    { required: true, message: '请输入面积', trigger: 'blur' },
    { pattern: /^\d+(\.\d+)?$/, message: '非法数据', trigger: 'blur' },
  ],
  // 价格
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { pattern: /^\d+(\.\d+)?$/, message: '价格只能为数字', trigger: 'blur' },
  ],
  // 房屋地址
  houseLocation: [
    { required: true, message: '请输入房屋地址', trigger: 'blur' },
    { min: 1, max: 50, message: '长度应为1-50个字符之间', trigger: 'blur' },
  ],
  // 房产证编号
  houseId: [
    { required: true, message: '请输入房产证编号', trigger: 'blur' },
    { len: 9, message: '房产证编号长度应为9位', trigger: 'blur' },
    { pattern: /^\d{9}$/, message: '房产证编号只能为数字', trigger: 'blur' },
  ],
  // 房屋简介/发布信息描述
  description: [
    { min: 0, max: 100, message: '长度应为0-100个字符之间', trigger: 'blur' },
  ],
  // 租房类型
  rentType: [
    { required: true, message: '请选择租房类型', trigger: 'blur' },
    {
      validator: (rule: any, value: number, callback: any) => {
        if (value === -1) {
          callback(new Error('请选择租房类型'));
        } else {
          callback();
        }
      }
    }
  ],
  // 最短租期
  minPeriod: [
    { required: true, message: '请输入最短租期', trigger: 'blur' },
    { pattern: /^\d+(\.\d+)?$/, message: '非法数据', trigger: 'blur' },
  ],
  // 房屋图片
  pic: [
    { required: true, message: '请上传房屋图片', trigger: 'blur' },
  ],
  // 家具家电
  furniture: [
    { min: 0, max: 100, message: '长度应为0-100个字符之间', trigger: 'blur' },
  ],
  // 预算
  budget: [
    { required: true, message: '请输入预算', trigger: 'blur' },
    { pattern: /^\d+(\.\d+)?$/, message: '非法数据', trigger: 'blur' },
  ],




}