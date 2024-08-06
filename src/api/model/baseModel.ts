export interface BasePageReq {
  page: number;
  pageSize: number;
}

export interface BaseListResp<T> {
  data: T[];
  total: number;
}

export interface BaseResp<T> {
  statusCode: number;
  statusMsg: string;
  data?: T;
}

export interface BaseIdReq {
  ID: number;
}

export interface BaseIdsReq {
  ids: number[];
}
