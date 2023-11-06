import { globalConfig, serverUrl } from './api';
import type { BuyForm, SellForm } from '@/api/request';
import type { AddBuyResponse, AddSellResponse, GetAllBuyInfoByUserIdResponse, GetAllSellInfoByUserIdResponse, GetAllSellInfoResponse, GetSellInfoByIdResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { type AxiosResponse } from 'axios';

enum Api {
  AddBuy = '/sell/req/add',
  GetAllBuyInfoByUserId = '/sell/req/allById',



}

/**
 * 添加求购信息
 * @param form 求购信息表单
 */
export function addBuy(form: BuyForm): Promise<AxiosResponse<AddBuyResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.post(`${serverUrl}${Api.AddBuy}`, form, config);
}

/**
 * 获取指定用户id的所有求购信息
 * @param userId 用户id
 */
export function getAllBuyInfoByUserId(userId: number): Promise<AxiosResponse<GetAllBuyInfoByUserIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: userId,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetAllBuyInfoByUserId}`, config);
}