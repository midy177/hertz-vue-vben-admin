/**
 * @model 后台角色
 */
/**
 *  @description: role info response
 */
export interface RoleInfo {
  ID: number;
  createdAt?: number;
  title?: string;
  name: string;
  value: string;
  defaultRouter: string;
  status: number;
  remark: string;
  orderNo: number;
}
