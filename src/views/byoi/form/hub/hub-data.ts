import { FormSchema } from '@/components/Form';
import { RuleObject } from 'ant-design-vue/lib/form/interface';

// 自定义校验方法示例
const validateList = (rule: RuleObject, value: string[]) => {
  for (const item of value) {
    if (!item) {
      return Promise.reject('密码是必填项');
    }
  }
  if (value.length > 2 || value.length < 2) {
    return Promise.reject('必须且只允许输入两个磁盘');
  }
  if (value.length === 2 && value[0] === value[1]) {
    return Promise.reject('两个磁盘名称一样');
  }
  return Promise.resolve();
};

export const HubSchemas: FormSchema[] = [
  {
    field: 'meta.domain',
    component: 'Input',
    label: '绑定域名',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入绑定域名',
    },
    required: true,
  },
  {
    field: 'pubAddr',
    component: 'Input',
    label: '公有IP',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入公有IP',
    },
    required: true,
  },
  {
    field: 'priAddr',
    component: 'Input',
    label: '私有IP',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入私有IP',
    },
    required: true,
  },
  {
    field: 'port',
    component: 'InputNumber',
    label: 'SSH端口',
    colProps: {
      span: 8,
    },
    defaultValue: 22,
    componentProps: {
      min: 1,
      max: 65535,
      placeholder: '请输入SSH端口',
    },
    required: true,
  },
  {
    field: 'username',
    component: 'Input',
    label: 'SSH用户',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入SSH用户',
    },
    required: true,
  },
  {
    field: 'usePassword',
    component: 'Switch',
    label: '使用',
    defaultValue: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      checkedChildren: '密码',
      unCheckedChildren: '密钥',
    },
    required: true,
  },
  {
    field: 'password',
    component: 'InputPassword',
    label: 'SSH密码',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入SSH密码',
    },
    required: true,
    show: ({ values }) => values.usePassword,
  },
  {
    field: 'privateKey',
    component: 'InputTextArea',
    label: 'SSH密钥',
    colProps: {
      span: 8,
    },
    componentProps: {
      rows: 4,
      placeholder: '请输入SSH密钥',
      style: {
        fontFamily: 'monospace',
      },
    },
    required: true,
    show: ({ values }) => !values.usePassword,
  },
  {
    field: 'meta.disk',
    component: 'Select',
    label: '磁盘',
    colProps: {
      span: 8,
    },
    componentProps: {
      allowClear: true,
      mode: 'tags',
      open: false,
      placeholder: '请输入两块磁盘名称',
    },
    rules: [{ required: true }, { validator: validateList, trigger: 'blur' }],
    required: true,
  },
];
