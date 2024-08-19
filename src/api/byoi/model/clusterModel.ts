// Create or Update Menu Request Params Interface
export interface ByoiClusterInfo {
  ID: number; // ID
  name: string; // 名称
  label: string; // 备注
  tags: string; // 标签
  cc: string; // 国家代码缩写
  sn: string; // 序列号
  ac: string; // 激活码
  meta: ServerInfo[]; // 元信息，用来存放主机信息
  createdAt?: string; // 创建时间
  updatedAt?: string; // 更新时间
}

/**
 *  author: ryan
 *  @description: Get menu by page
 */
export interface ByoiClusterListModel {
  total: number;
  data: ByoiClusterInfo[];
}

interface ServerInfo {
  type: string;
  meta: CMMeta | SbcMeta[] | ProxyMeta[] | HubMeta[];
}

interface CMMeta {
  publicAddr: string;
  privateAddr: string;
  port: number;
  username: string;
  password: string;
  privateKey: string;
  domain: string;
}

interface SbcMeta {
  publicAddr: string;
  privateAddr: string;
  port: number;
  username: string;
  password: string;
  privateKey: string;
  domain: string;
  publicSlb: string;
  privateSlb: string;
}

interface ProxyMeta {
  publicAddr: string;
  privateAddr: string;
  port: number;
  username: string;
  password: string;
  privateKey: string;
  domain: string;
  publicSlb: string;
  privateSlb: string;
}

interface HubMeta {
  publicAddr: string;
  privateAddr: string;
  port: number;
  username: string;
  password: string;
  privateKey: string;
  domain: string;
  publicSlb: string;
  privateSlb: string;
  disk: string[];
}
