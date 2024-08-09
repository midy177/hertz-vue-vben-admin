import { defHttp } from '@/utils/http/axios';
import { CreateOrUpdateUserReq, UserListReq, UserProfile } from '@/api/sys/model/SysUserModel';
import { BaseListResp } from '@/api/model/baseModel';
import { UserInfo } from '#/store';

enum Api {
  Register = '/api/user/register',
  OauthLogout = '/api/admin/token',
  GetUserList = '/api/admin/user/list',
  CreateUser = '/api/admin/user/create',
  UpdateUser = '/api/admin/user/update',
  DeleteUser = '/api/admin/user/delete',
  SetUserStatus = '/api/admin/user/status',
  GetProfile = '/api/admin/user/profile',
}

/**
 * 后台用户-分页列表
 */
export const listSysUserApi = (queryForm: UserListReq) => {
  return defHttp.get<BaseListResp<UserInfo>>({
    url: Api.GetUserList,
    params: queryForm,
  });
};

/**
 * 后台用户-新增
 */
export const createSysUserApi = (insertForm: CreateOrUpdateUserReq) => {
  return defHttp.post<void>({
    url: Api.CreateUser,
    params: insertForm,
  });
};

/**
 * 后台用户-编辑
 */
export const updateSysUserApi = (updateForm: CreateOrUpdateUserReq) => {
  return defHttp.put<void>({
    url: Api.UpdateUser,
    params: updateForm,
  });
};

/**
 * 后台用户-删除
 */
export const deleteSysUserApi = (id: number) => {
  return defHttp.delete<void>({
    url: Api.DeleteUser,
    params: {
      ID: id,
    },
  });
};

/**
 *  @description: set role's status
 */
export const setUserStatus = (id: number, status: number) => {
  return defHttp.post({ url: Api.SetUserStatus, params: { id, status } });
};

/**
 *  author: Ryan Su
 *  @description: Get user profile
 */
export const getUserProfile = () => {
  return defHttp.get<UserProfile>({ url: Api.GetProfile }, { errorMessageMode: 'modal' });
};

/**
 *  author: Ryan Su
 *  @description: update user profile
 */
export function updateProfile(params: UserProfile) {
  return defHttp.post<void>({ url: Api.GetProfile, params }, { errorMessageMode: 'modal' });
}
