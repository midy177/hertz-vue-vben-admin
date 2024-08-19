import { defHttp } from '@/utils/http/axios';
import { CreateOrUpdateMenuReq, MenuListModel } from '@/api/sys/model/menuModel';

enum Api {
  GetMenuListByRole = '/api/admin/menu/role',
  GetMenuList = '/api/admin/menu/list',
  CreateMenu = '/api/admin/menu/create',
  UpdateMenu = '/api/admin/menu/update',
  DeleteMenu = '/api/admin/menu/delete',
  CreateOrUpdateMenuParam = '/api/menu/param/create_or_update',
  DeleteMenuParam = '/api/menu/param/delete',
  GetMenuParamsByMenuId = '/api/admin/menu/param/list',
}

export const getUserMenuListApi = () => {
  return defHttp.get<MenuListModel>(
    { url: Api.GetMenuListByRole },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * 取所有菜单
 */
export const listAllMenuApi = () => {
  return defHttp.get<MenuListModel>(
    { url: Api.GetMenuList },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * 后台菜单-新增
 */
export const createMenuApi = (insertForm: CreateOrUpdateMenuReq) => {
  return defHttp.post<void>(
    {
      url: Api.CreateMenu,
      params: insertForm,
    },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * 后台菜单-编辑
 */
export const updateMenuApi = (updateForm: CreateOrUpdateMenuReq) => {
  return defHttp.put<void>(
    {
      url: Api.UpdateMenu,
      params: updateForm,
    },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * 后台菜单-删除
 */
export const deleteMenuApi = (id: number) => {
  return defHttp.delete<void>(
    {
      url: Api.DeleteMenu,
      params: {
        ID: id,
      },
    },
    {
      errorMessageMode: 'modal',
    },
  );
};
