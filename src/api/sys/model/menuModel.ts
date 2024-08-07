import type { RouteMeta } from 'vue-router';
// export interface RouteItem {
//   path: string;
//   component: any;
//   meta: RouteMeta;
//   name?: string;
//   alias?: string | string[];
//   redirect?: string;
//   caseSensitive?: boolean;
//   children?: RouteItem[];
// }

/**
 *  author: ryan
 *  @description: Get menu by page
 */
export interface MenuListModel {
  total: number;
  data: RouteItem[];
}

// interface Meta {
//   title: string;
//   icon: string;
//   hideMenu: boolean;
//   hideBreadcrumb: boolean;
//   currentActiveMenu: string;
//   ignoreKeepAlive: boolean;
//   hideTab: boolean;
//   frameSrc: string;
//   carryParam: boolean;
//   hideChildrenInMenu: boolean;
//   affix: boolean;
//   dynamicLevel: number;
//   realPath: string;
// }

export interface RouteItem {
  ID: number;
  createdAt?: string;
  updatedAt?: string;
  level: number;
  parentID: number;
  path: string;
  name: string;
  redirect: string;
  component: string;
  orderNo: number;
  disabled: boolean;
  menuType: number;
  children: RouteItem[];
  meta: RouteMeta;
}
