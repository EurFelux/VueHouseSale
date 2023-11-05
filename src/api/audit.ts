import { globalConfig, serverUrl } from './api';
import type { AuditForm } from '@/api/request';
import type { AnyDataResponse, GetAuditsByUserResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { type AxiosResponse } from 'axios';

enum Api {
  AddAudit = '/audit/add',
  GetAuditsByUser = '/audit/list',
}

// 添加审核
export async function addAudit(form: AuditForm): Promise<AxiosResponse<AnyDataResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.post(`${serverUrl}${Api.AddAudit}`, form, config);
}

// 获取指定用户的所有审核
export async function getAuditsByUser(userID: number): Promise<AxiosResponse<GetAuditsByUserResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: userID,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.get(`${serverUrl}${Api.GetAuditsByUser}`, config);
}