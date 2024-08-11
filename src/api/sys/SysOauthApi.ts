import { defHttp } from '@/utils/http/axios';
import { BaseIdReq, BaseListResp, BasePageReq } from '@/api/model/baseModel';
import {
  OauthLoginReq,
  OauthLoginResp,
  ProviderInfo,
  RedirectInfo,
} from '@/api/sys/model/oauthModel';

enum Api {
  OauthLogin = '/api/oauth/login',
  OauthLoginCallback = '/api/oauth/callback',
  GetProviderList = '/api/admin/oauth/provider/list',
  CreateProvider = '/api/admin/oauth/provider/create',
  UpdateProvider = '/api/admin/oauth/provider/update',
  DeleteProvider = '/api/admin/oauth/provider',
}

/**
 * @description: Get provider list
 */

export const getProviderListApi = (params: BasePageReq) => {
  return defHttp.get<BaseListResp<ProviderInfo>>({ url: Api.GetProviderList, params });
};

/**
 *  author: ryan
 *  @description: create or update a provider
 */
export const createProviderApi = (params: ProviderInfo) => {
  return defHttp.post<void>(
    { url: Api.CreateProvider, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: ryan
 *  @description: create or update a provider
 */
export const updateProviderApi = (params: ProviderInfo) => {
  return defHttp.post<void>(
    { url: Api.UpdateProvider, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a provider
 */
export const deleteProviderApi = (params: BaseIdReq) => {
  return defHttp.delete<void>(
    { url: Api.DeleteProvider, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: oauth log in
 */
export const oauthLoginApi = (params: OauthLoginReq) => {
  return defHttp.post<RedirectInfo>(
    { url: Api.OauthLogin, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: oauth log in callback
 */
export const oauthLoginCallbackApi = (url: string) => {
  return defHttp.get<OauthLoginResp>(
    {
      url: Api.OauthLoginCallback + url,
    },
    {
      errorMessageMode: 'modal',
      retryRequest: { isOpenRetry: false, count: 1, waitTime: 1000 },
    },
  );
};
