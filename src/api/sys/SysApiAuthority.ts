import { defHttp } from '@/utils/http/axios';
import {
  ApiAuthorityReq,
  ApiListReq,
  MenuAuthorityInfo,
} from '@/api/sys/model/SysApiAuthorityModel';
import { BaseIdReq, BaseListResp } from '@/api/model/baseModel';
import { ApiAuthorityInfo, ApiInfo } from '@/api/sys/model/SysApiModel';

enum Api {
  UpdateApiAuthority = '/api/admin/authority/api/update',
  CreateMenuAuthority = '/api/admin/authority/menu/create',
  UpdateMenuAuthority = '/api/admin/authority/menu/update',
  GetRoleMenuList = '/api/admin/authority/menu/role',
  GetRoleApiList = '/api/admin/authority/api/role',
  GetApiList = '/api/admin/api/list',
}

/**
 *  author: Ryan Su
 *  @description: this function is used to get api list for authorization
 */

export const getApiList = (params: ApiListReq) => {
  return defHttp.get<BaseListResp<ApiInfo>>(
    { url: Api.GetApiList, params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * @description: Get api authorization list
 */

export const getApiAuthorityApi = (params: BaseIdReq) => {
  return defHttp.post<BaseListResp<ApiAuthorityInfo>>(
    { url: Api.GetRoleApiList, params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: ryan
 *  @description: create or update api authorization
 */
export const updateApiAuthorityApi = (params: ApiAuthorityReq) => {
  return defHttp.put<void>(
    { url: Api.UpdateApiAuthority, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description:
 */

export const createMenuAuthorityApi = (params: MenuAuthorityInfo) => {
  return defHttp.post<void>(
    { url: Api.CreateMenuAuthority, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description:
 */

export const updateMenuAuthorityApi = (params: MenuAuthorityInfo) => {
  return defHttp.put<void>(
    { url: Api.UpdateMenuAuthority, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: get role's menu authorization ids
 */

export const getMenuAuthorityApi = (params: BaseIdReq) => {
  return defHttp.post<MenuAuthorityInfo>(
    {
      url: Api.GetRoleMenuList,
      params,
    },
    {
      errorMessageMode: 'modal',
    },
  );
};
