import { defHttp } from '@/utils/http/axios';
import { ByoiClusterInfo, ByoiClusterListModel } from '@/api/byoi/model/clusterModel';

enum Api {
  GetByoiClusterList = '/api/admin/byoi/list',
  CreateByoiCluster = '/api/admin/byoi/create',
  UpdateByoiCluster = '/api/admin/byoi/update',
  DeleteByoiCluster = '/api/admin/byoi/delete',
}

export const getByoiClusterListApi = () => {
  return defHttp.get<ByoiClusterListModel>(
    { url: Api.GetByoiClusterList },
    {
      errorMessageMode: 'modal',
    },
  );
};

/**
 * 后台菜单-新增
 */
export const createByoiClusterListApi = (insertForm: ByoiClusterInfo) => {
  return defHttp.post<void>(
    {
      url: Api.CreateByoiCluster,
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
export const updateByoiClusterListApi = (updateForm: ByoiClusterInfo) => {
  return defHttp.put<void>(
    {
      url: Api.UpdateByoiCluster,
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
export const deleteByoiClusterListApi = (id: number) => {
  return defHttp.delete<void>(
    {
      url: Api.DeleteByoiCluster,
      params: {
        ID: id,
      },
    },
    {
      errorMessageMode: 'modal',
    },
  );
};
