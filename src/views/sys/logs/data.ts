import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import {formatToDateTime} from "@/utils/dateUtil";

/**
 * 表格列
 */
export const columns: BasicColumn[] = [
  {
    title: '类型',
    dataIndex: 'type',
    width: 60,
  },
  {
    title: '方法',
    dataIndex: 'method',
    width: 80,
  },
  {
    title: '接口路径',
    dataIndex: 'api',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'success',
    width: 60,
    customRender: ({ record }) => {
      const status = record.success;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '成功' : '失败';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '客户端IP',
    dataIndex: 'ip',
    width: 80,
  },
  {
    title: '请求内容',
    dataIndex: 'reqContent',
    width: 80,
    ellipsis: true,
  },
  {
    title: '返回内容',
    dataIndex: 'respContent',
    width: 80,
    ellipsis: true,
  },
  {
    title: '客户端类型',
    dataIndex: 'userAgent',
    width: 80,
    ellipsis: true,
  },
  {
    title: '发起账户',
    dataIndex: 'operator',
    width: 50,
  },
  {
    title: '耗时(ms)',
    dataIndex: 'time',
    width: 50,
  },
  {
    title: '记录时间',
    dataIndex: 'createdAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  // {
  //   title: '更新时间',
  //   dataIndex: 'updatedAt',
  //   width: 50,
  //   customRender: ({ record }) => {
  //     return formatToDateTime(record.updatedAt);
  //   },
  // },
];

/**
 * 查询条件
 */
export const queryFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: '类型',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'success',
    label: '状态',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '成功', value: true },
        { label: '失败', value: false },
      ],
    },
  },
  {
    field: 'method',
    label: '方法',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'HEAD', value: 'HEAD' },
      ],
    },
  },
  {
    field: 'api',
    label: '接口路径',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'operator',
    label: '发起账户',
    component: 'Input',
    colProps: { span: 8 },
  },
];
