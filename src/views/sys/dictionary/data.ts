import { DictionaryInfo } from '@/api/sys/model/dictionaryModel';
import { BasicColumn, FormSchema } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

interface compOption {
  label: string;
  value: string | number;
}
// get role options data
export const dicOptionData = (dicInfoInStore: DictionaryInfo[], type: number): compOption[] => {
  const result: compOption[] = [];
  // type 1 means search schema
  if (type === 1) {
    result.push({ label: '全部', value: 0 });
  }
  for (let i = 0; i < dicInfoInStore.length; i++) {
    result.push({
      label: dicInfoInStore[i].name,
      value: dicInfoInStore[i].ID,
    });
  }
  return result;
};

export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    width: 200,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 50,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (record.status) {
        return '开启';
      }
      return '关闭';
    },
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

export const detailColumns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    width: 200,
  },
  {
    title: '键',
    dataIndex: 'key',
    width: 50,
  },
  {
    title: '值',
    dataIndex: 'value',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (record.status) {
        return '开启';
      }
      return '关闭';
    },
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

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 100 }],
  },
  {
    field: 'name',
    label: '名称',
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 10 }],
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'ID',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'name',
    label: '名称',
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
    field: 'status',
    label: '状态',
    required: true,
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '开启', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
  },
];

export const detailSchema: FormSchema[] = [
  {
    field: 'ID',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'key',
    label: '键',
    required: true,
    component: 'Input',
    rules: [{ max: 10 }],
  },
  {
    field: 'value',
    label: '值',
    required: true,
    component: 'Input',
  },
  {
    field: 'parentID',
    label: '父级',
    required: true,
    component: 'Select',
    componentProps: {
      options: [],
    },
  },
  {
    field: 'status',
    label: '状态',
    required: true,
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '开启', value: 1 },
        { label: '关闭', value: 0 },
      ],
    },
  },
];
