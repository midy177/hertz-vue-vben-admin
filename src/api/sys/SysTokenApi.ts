import { defHttp } from '@/utils/http/axios';
import { BaseIdReq, BaseIdsReq, BaseListResp, BasePageReq } from '@/api/model/baseModel';
import { ApiInfo } from '@/api/sys/model/SysApiModel';

enum Api {
  GetTokenList = '/api/admin/token/list',
  UpdateToken = '/api/admin/token/update',
  DeleteToken = '/api/admin/token/delete',
  BatchDeleteToken = '/token/batch_delete',
  SetTokenStatus = '/token/status',
}

/**
 * @description: Get api list
 */

export const getTokenListApi = async (params: BasePageReq) => {
  return await defHttp.get<BaseListResp<ApiInfo>>(
    { url: Api.GetTokenList, params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: ryan
 *  @description: create a new api
 */
export const updateTokenApi = (params: ApiInfo) => {
  return defHttp.put<void>(
    { url: Api.UpdateToken, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete api
 */
export const deleteTokenApi = (params: BaseIdReq) => {
  return defHttp.delete<void>(
    { url: Api.DeleteToken, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: batch delete tokens
 */
export const batchDeleteTokenApi = (params: BaseIdsReq) => {
  return defHttp.post<void>(
    { url: Api.BatchDeleteToken, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set the token status
 */
export const setTokenStatus = (id: number, status: number) => {
  return defHttp.post(
    { url: Api.SetTokenStatus, params: { id, status } },
    {
      errorMessageMode: 'modal',
    },
  );
};
