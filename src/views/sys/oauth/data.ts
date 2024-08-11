import { BasicColumn, FormSchema } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 50,
  },
  {
    title: '客户端ID',
    dataIndex: 'clientID',
    width: 50,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    rules: [{ max: 50 }],
  },
  {
    field: 'clientID',
    label: '客户端ID',
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'clientSecret',
    label: '客户端密钥',
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'redirectUrl',
    label: '重定向URL',
    required: true,
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'scopes',
    label: '权限范围',
    required: true,
    component: 'Input',
    rules: [{ max: 300 }],
  },
  {
    field: 'authUrl',
    label: '鉴权地址',
    required: true,
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'tokenUrl',
    label: '获取Token的地址',
    required: true,
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'infoUrl',
    label: '获取个人信息地址',
    required: true,
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'authStyle',
    label: '鉴权方式',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '参数模式', value: 1 },
        { label: 'header模式', value: 2 },
      ],
    },
  },
];
