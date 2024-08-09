import { defHttp } from '@/utils/http/axios';
import { SysLogApiResult } from './model/SysLogModel';
import { BasePageReq } from '@/api/model/baseModel';

enum Api {
  GetLogsList = '/api/admin/logs/list',
  DeleteLogs = '/api/admin/logs/delete_all',
}

/**
 * 后台操作日志-分页列表
 */
export const listSysLogApi = (queryForm: BasePageReq) => {
  return defHttp.get<SysLogApiResult[]>(
    {
      url: Api.GetLogsList,
      params: queryForm,
    },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete logs
 */
export const deleteAllSysLogApi = () => {
  return defHttp.delete<void>(
    { url: Api.DeleteLogs },
    {
      errorMessageMode: 'modal',
    },
  );
};
