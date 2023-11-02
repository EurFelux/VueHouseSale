// 应用名
export const appName: string = "House App";

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
export function httpError(res: AxiosResponse<any>) {
  ElMessage.error(`HTTP 错误：${res.status} ${res.statusText}`)
}

export function serverError(res: AxiosResponse<AnyDataResponse>) {
  ElMessage.error(`错误：${res.data.message}`)
}

export function normalError(message: string) {
  ElMessage.error(message)
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
        } else if (value !== 0 && value !== 1 && value !== 2) {
          callback(new Error('性别只能为女、男或保密'));
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

}