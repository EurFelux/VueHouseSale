import { globalConfig, serverUrl } from './api';
import type {} from '@/api/request';
import type { AnyDataResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { type AxiosResponse } from 'axios';

enum Api {
  AddAudit = '/audit/add',
}

// 添加审核
async function addAudit(): Promise<AxiosResponse<AnyDataResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.get(`${serverUrl}${Api.AddAudit}`, config);
}
