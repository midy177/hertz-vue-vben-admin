import { defHttp } from '@/utils/http/axios';
import { BaseIdReq, BaseListResp, BasePageReq } from '@/api/model/baseModel';
import {DictionaryDetail, DictionaryInfo} from '@/api/sys/model/dictionaryModel';

enum Api {
  DictionaryList = '/api/admin/dict/list',
  CreateDictionary = '/api/admin/dict/create',
  UpdateDictionary = '/api/admin/dict/update',
  DeleteDictionary = '/api/admin/dict/delete',
  DictionaryDetailList = '/api/admin/dict/detail/list',
  CreateDetailDictionary = '/api/admin/dict/detail/create',
  UpdateDictionaryDetail = '/api/admin/dict/detail/update',
  DeleteDictionaryDetail = '/api/admin/dict/detail/delete',
}

/**
 * @description: Get dictionary list
 */

export const getDictionaryListApi = (params: BasePageReq) => {
  return defHttp.get<BaseListResp<DictionaryInfo>>(
    { url: Api.DictionaryList, params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const createDictionaryApi = (params: DictionaryInfo) => {
  return defHttp.post<void>(
    { url: Api.CreateDictionary, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const updateDictionaryApi = (params: DictionaryInfo) => {
  return defHttp.put<void>(
    { url: Api.UpdateDictionary, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a dictionary
 */
export const deleteDictionaryApi = (params: BaseIdReq) => {
  return defHttp.delete<void>(
    { url: Api.DeleteDictionary, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * @description: Get dictionary detail list
 */

export const getDictionaryDetailListApi = (params: BasePageReq) => {
  return defHttp.get<BaseListResp<DictionaryDetail>>(
    {
      url: Api.DictionaryDetailList,
      params,
    },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const createDetailDictionaryApi = (params: DictionaryDetail) => {
  return defHttp.post<void>(
    { url: Api.CreateDetailDictionary, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: ryan
 *  @description: create a new dictionary detail
 */
export const updateDictionaryDetailApi = (params: DictionaryDetail) => {
  return defHttp.put<void>(
    { url: Api.UpdateDictionaryDetail, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a dictionary detail
 */
export const deleteDictionaryDetailApi = (params: BaseIdReq) => {
  return defHttp.delete<void>(
    { url: Api.DeleteDictionaryDetail, params: params },
    {
      errorMessageMode: 'modal',
    },
  );
};
