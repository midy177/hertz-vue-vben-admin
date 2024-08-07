/**
 *  author: Ryan Su
 *  @description: api info response
 */

export interface ApiInfo {
  ID: number; // API ID
  createdAt?: string; // 创建时间
  updatedAt?: string; // 更新时间
  path: string; // API 路径
  description: string; // API 描述
  group: string; // API 分组
  method: string; // 请求方法
}
