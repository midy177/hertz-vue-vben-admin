import { defHttp } from '@/utils/http/axios';
import { RoleInfo } from './model/SysRoleModel';
import { BaseIdReq, BaseListResp, BasePageReq } from '@/api/model/baseModel';

enum Api {
  GetRoleList = '/api/admin/role/list',
  CreateRole = '/api/admin/role/create',
  UpdateRole = '/api/admin/role/update',
  DeleteRole = '/api/admin/role',
  SetRoleStatus = '/api/admin/role/status',
}

/**
 * 后台角色-分页列表
 */
export const listSysRoleApi = (queryForm: BasePageReq) => {
  return defHttp.get<BaseListResp<RoleInfo>>(
    {
      url: Api.GetRoleList,
      params: queryForm,
    },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * 后台角色-新增
 */
export const createSysRoleApi = (insertForm: RoleInfo) => {
  return defHttp.post<void>(
    {
      url: Api.CreateRole,
      params: insertForm,
    },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * 后台角色-编辑
 */
export const updateSysRoleApi = (updateForm: RoleInfo) => {
  return defHttp.put<void>(
    {
      url: Api.UpdateRole,
      params: updateForm,
    },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * 后台角色-删除
 */
export const deleteSysRoleApi = (params: BaseIdReq) => {
  return defHttp.delete<void>(
    {
      url: Api.DeleteRole,
      params: params,
    },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set role's status
 */
export const setRoleStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetRoleStatus, params: { id, status } });

/**
 * 后台角色-绑定角色与菜单关联关系
 */
export const bindMenusApi = (roleId: string, menuIds: string[]) => {
  return defHttp.put<void>(
    {
      url: Api.UpdateRole,
      params: {
        menuIds: menuIds,
      },
    },
    {
      errorMessageMode: 'modal',
    },
  );
};
