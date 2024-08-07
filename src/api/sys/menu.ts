import { defHttp } from '@/utils/http/axios';
import { MenuListModel, RouteItem } from './model/menuModel';
import { SysMenuApiResult } from '@/api/sys/model/SysMenuModel';
import { list2Tree } from '@/helio/converter/bizDataStructConverter';

enum Api {
  // Helio: 修改为取侧边菜单接口地址
  GetMenuListByRole = '/api/admin/menu/role',
}

/**
 * Helio: 菜单项 array 转 tree
 * @param items 菜单项 array
 */
export function menu2Tree(
  items: RouteItem[] | SysMenuApiResult[],
): MenuListModel | SysMenuApiResult[] {
  return list2Tree(items);
}

// Helio: 修改为 async 异步调用，以便得到菜单列表后直接转为树结构
export const getMenuList = async () => {
  const res = await defHttp.get<MenuListModel>({ url: Api.GetMenuListByRole });
  // Helio: 由前端将列表转为树结构
  // return menu2Tree(res.data);
  return res.data;
};
