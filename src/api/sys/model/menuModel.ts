import { RouteComponent, RouteMeta } from 'vue-router';

/**
 *  author: ryan
 *  @description: Get menu by page
 */
export interface MenuListModel {
  total: number;
  data: RouteItem[];
}

// Menu Meta Data Interface
interface Meta {
  title: string;
  icon: string;
  hideMenu: boolean;
  hideBreadcrumb: boolean;
  currentActiveMenu: string;
  ignoreKeepAlive: boolean;
  hideTab: boolean;
  frameSrc: string;
  carryParam: boolean;
  hideChildrenInMenu: boolean;
  affix: boolean;
  dynamicLevel: number;
  realPath: string;
}

export interface RouteItem {
  ID: number;
  createdAt?: string;
  updatedAt?: string;
  level: number;
  parentID: number;
  path: string;
  name: string;
  redirect: string;
  component: string | RouteComponent | (() => Promise<RouteComponent>) | undefined;
  orderNo: number;
  disabled: boolean;
  menuType: number;
  children: RouteItem[];
  meta: RouteMeta;
}

// Create or Update Menu Request Params Interface
export interface CreateOrUpdateMenuReq {
  ID: number;
  parentID: number;
  level: number;
  path: string;
  name: string;
  redirect: string;
  component: string;
  orderNo: number;
  disabled: boolean;
  menuType: number;
  meta: Meta;
}
