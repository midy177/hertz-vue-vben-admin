import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import { formatToDateTime } from '@/utils/dateUtil';

/**
 * 表格列
 */
export const columns: BasicColumn[] = [
  {
    title: '路径',
    dataIndex: 'path',
    width: 200,
  },
  {
    title: '分组',
    dataIndex: 'group',
    width: 50,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 200,
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    width: 50,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

/**
 * 查询条件
 */
export const queryFormSchema: FormSchema[] = [
  {
    field: 'path',
    label: '路径',
    component: 'Input',
    componentProps: {},
    colProps: { span: 8 },
    rules: [{ max: 100 }],
  },
  {
    field: 'group',
    label: '分组',
    component: 'Input',
    componentProps: {},
    colProps: { span: 8 },
    rules: [{ max: 10 }],
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
    componentProps: {},
    colProps: { span: 8 },
    rules: [{ max: 50 }],
  },
  {
    field: 'method',
    label: '请求方法',
    component: 'Input',
    componentProps: {},
    colProps: { span: 8 },
  },
];

/**
 * 查看详情表单
 */
export const retrieveDetailFormSchema: DescItem[] = [
  {
    field: 'path',
    label: '路径',
  },
  {
    field: 'group',
    label: '分组',
  },
  {
    field: 'description',
    label: '描述',
  },
  {
    field: 'method',
    label: '请求方法',
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
    field: 'path',
    label: '路径',
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'group',
    label: '分组',
    required: true,
    component: 'Input',
    rules: [{ max: 10 }],
  },
  {
    field: 'description',
    label: '描述',
    required: true,
    component: 'Input',
    rules: [{ max: 50 }],
  },
  {
    field: 'method',
    label: '请求方法',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'PUT', value: 'PUT' },
      ],
    },
  },
];
