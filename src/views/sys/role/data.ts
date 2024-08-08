import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import { formatToDateTime } from '@/utils/dateUtil';
import { setRoleStatus } from '@/api/sys/SysRoleApi';
import { useMessage } from '@/hooks/web/useMessage';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { DataNode } from 'ant-design-vue/es/tree';
import { RouteItem } from '@/api/sys/model/menuModel';
import { ApiAuthorityInfo, ApiInfo } from '@/api/sys/model/SysApiModel';

/**
 * 表格列
 */
export const columns: BasicColumn[] = [
  {
    title: '角色名',
    dataIndex: 'name',
    width: 220,
  },
  {
    title: '角色编码',
    dataIndex: 'value',
    width: 220,
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 220,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        loading: record.pendingStatus,
        onChange(checked, e) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          setRoleStatus(record.ID, newStatus)
            .then(async () => {
              record.status = newStatus;
              await createMessage.success('更新成功');
            })
            .catch(async () => {
              await createMessage.error('更新失败');
              console.error(e);
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 220,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: '备注',
    width: 220,
    dataIndex: 'remark',
  },
];

/**
 * 查询条件
 */
export const queryFormSchema: FormSchema[] = [
  {
    field: 'ID',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '角色名',
    required: true,
    component: 'Input',
    rules: [{ max: 20 }],
  },
  {
    field: 'orderNo',
    label: '排序',
    defaultValue: 0,
    component: 'InputNumber',
    required: true,
    rules: [{ type: 'number', max: 1000 }],
  },
  {
    field: 'value',
    label: '角色编码',
    required: true,
    component: 'Input',
    rules: [{ min: 1, max: 10 }],
  },
  {
    field: 'defaultRouter',
    label: '默认路由',
    required: true,
    component: 'Input',
    rules: [{ max: 50 }],
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    rules: [{ max: 200 }],
  },
];

/**
 * 查看详情表单
 */
export const retrieveDetailFormSchema: DescItem[] = [
  {
    field: 'name',
    label: '角色名',
  },
  {
    field: 'orderNo',
    label: '排序',
  },
  {
    field: 'value',
    label: '角色编码',
  },
  {
    field: 'defaultRouter',
    label: '默认路由',
  },
  {
    field: 'status',
    label: '状态',
    render(val, data) {
      return data.status === 1 ? '启用' : '禁用';
    },
  },
  {
    label: '备注',
    field: 'remark',
  },
];

/**
 * 新增/编辑表单
 */
export const insertOrUpdateFormSchema: FormSchema[] = [
  {
    field: 'ID',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '角色名',
    required: true,
    component: 'Input',
    rules: [{ max: 20 }],
  },
  {
    field: 'orderNo',
    label: '排序',
    defaultValue: 0,
    component: 'InputNumber',
    required: true,
    rules: [{ type: 'number', max: 1000 }],
  },
  {
    field: 'value',
    label: '角色编码',
    required: true,
    component: 'Input',
    rules: [{ min: 1, max: 10 }],
  },
  {
    field: 'defaultRouter',
    label: '默认路由',
    required: true,
    component: 'Input',
    rules: [{ max: 50 }],
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    rules: [{ max: 200 }],
  },
];

/**
 *  author: Ryan Su
 *  @description: this function is used to convert menu data into tree node data
 */

export function convertMenuTreeData(params: RouteItem[] | undefined): DataNode[] {
  if (params === undefined) {
    return [];
  }
  const data: DataNode[] = [];
  for (const key in params) {
    const tmp: DataNode = {
      title: params[key].meta.title,
      key: params[key].ID,
      children: [],
    };
    // console.log(tmp.key);
    if (params[key].children !== undefined) {
      tmp.children = convertMenuTreeData(params[key].children);
    }
    data.push(tmp);
  }
  return data;
}

/**
 *  author: Ryan Su
 *  @description: this function is used to convert menu data into tree node data
 */

export function convertApiTreeData(params: ApiInfo[]): DataNode[] {
  const apiData: DataNode[] = [];
  if (params.length === 0) {
    return apiData;
  }

  const apiMap = new Map<string, boolean>();
  for (let i = 0; i < params.length; i++) {
    apiMap.set(params[i].group, true);
  }

  for (const k of apiMap.keys()) {
    const apiTmp: DataNode = {
      title: k,
      key: k,
      children: [],
    };

    for (let i = 0; i < params.length; i++) {
      if (params[i].group == k) {
        apiTmp.children?.push({
          title: params[i].description,
          key: params[i].ID,
        });
      }
    }

    apiData.push(apiTmp);
  }
  return apiData;
}

/**
 *  author: Ryan Su
 *  @description: convert checked data into authorized data
 */
export function convertApiCheckedKeysToReq(checked: number[], data: ApiInfo[]): ApiAuthorityInfo[] {
  // delete string keys
  const pureDigit: number[] = [];
  for (let i = 0; i < checked.length; i++) {
    if (typeof checked[i] === 'number') {
      pureDigit.push(checked[i]);
    }
  }
  // sort data
  data.sort(function (a, b) {
    return a.ID - b.ID;
  });
  pureDigit.sort(function (a, b) {
    return a - b;
  });
  // convert data
  const target: ApiAuthorityInfo[] = [];
  let j = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID === pureDigit[j]) {
      target.push({
        path: data[i].path,
        method: data[i].method,
      });
      j++;
    }
  }
  return target;
}

/**
 *  author: Ryan Su
 *  @description: this function is used to convert authorization api response into checked keys
 */

export function convertApiToCheckedKeys(checked: ApiAuthorityInfo[], data: ApiInfo[]): number[] {
  const dataMap = new Map();
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    dataMap.set(data[i].path + data[i].method, data[i].ID);
  }
  for (let i = 0; i < checked.length; i++) {
    result.push(dataMap.get(checked[i].path + checked[i].method));
  }
  return result;
}
