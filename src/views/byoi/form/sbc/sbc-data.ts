import { FormSchema } from '@/components/Form';

export const SbcSchemas: FormSchema[] = [
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
    field: 'meta.useSlb',
    component: 'Switch',
    label: '使用LB',
    defaultValue: false,
    colProps: {
      span: 8,
    },
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    required: true,
  },
  {
    field: 'meta.pubSlb',
    component: 'Input',
    label: '公有LB',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入公有负载均衡IP',
    },
    required: true,
    show: ({ values }) => values.useSlb,
  },
  {
    field: 'meta.priSlb',
    component: 'Input',
    label: '私有LB',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入私有负载均衡IP',
    },
    required: true,
    show: ({ values }) => values.useSlb,
  },
];
