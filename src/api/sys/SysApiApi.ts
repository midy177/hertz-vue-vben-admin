import {defHttp} from '@/utils/http/axios';
import {BaseIdReq, BaseListResp, BasePageReq} from '@/api/model/baseModel';
import {ApiInfo} from '@/api/sys/model/SysApiModel';

enum Api {
  GetApiList = '/api/admin/api/list',
  CreateApi = '/api/admin/api/create',
  UpdateApi = '/api/admin/api/update',
  DeleteApi = '/api/admin/api',
}

/**
 * @description: Get api list
 */

export const getApiListApi = async (params: BasePageReq) => {
  return await defHttp.get<BaseListResp<ApiInfo>>(
    { url: Api.GetApiList, params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: ryan
 *  @description: create a new api
 */
export const createApiApi = (params: ApiInfo) => {
  return defHttp.post<void>(
    { url: Api.CreateApi, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: ryan
 *  @description: create a new api
 */
export const updateApiApi = (params: ApiInfo) => {
  return defHttp.post<void>(
    { url: Api.UpdateApi, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete api
 */
export const deleteApiApi = (params: BaseIdReq) => {
  return defHttp.delete<void>(
    { url: Api.DeleteApi, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};
