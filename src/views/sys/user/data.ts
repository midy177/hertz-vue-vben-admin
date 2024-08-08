import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { DescItem } from '@/components/Description';
import { useMessage } from '@/hooks/web/useMessage';
import { setUserStatus } from '@/api/sys/SysUserApi';
import { formatToDateTime } from '@/utils/dateUtil';

/**
 * 表格列
 */
export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'username',
    width: 30,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 30,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 30,
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
          setUserStatus(record.ID, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success('状态修改成功');
            })
            .catch(() => {
              console.log(e);
              createMessage.error('状态修改失败');
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
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '账号',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'roleID',
    label: '角色ID',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      // search form does not support updateSchema function yet
      // therefore we have to manually set the options
      options: [
        { label: 'all', value: 0 },
        { label: 'admin', value: 1 },
        { label: 'stuff', value: 2 },
        { label: 'member', value: 3 },
      ],
    },
  },
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 18 }],
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ type: 'email' }],
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'avatar',
    label: '头像',
    defaultValue: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'ID',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'username',
    label: '账号',
    required: true,
    component: 'Input',
    rules: [{ max: 30 }],
  },
  {
    field: 'nickname',
    label: '昵称',
    required: true,
    component: 'Input',
    rules: [{ max: 30 }],
  },
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input',
    rules: [{ max: 18 }],
  },
  {
    field: 'email',
    label: '邮箱',
    required: true,
    component: 'Input',
    rules: [{ type: 'email' }],
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    rules: [{ min: 6, max: 30 }],
  },
  {
    field: 'roleID',
    label: '角色ID',
    required: true,
    component: 'Select',
    componentProps: {
      options: [],
    },
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
];

/**
 * 查询条件
 */
export const queryFormSchema: FormSchema[] = [
  {
    field: 'phoneNo',
    label: '手机号',
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
    field: 'username',
    label: '账号',
  },
  {
    field: 'nickname',
    label: '昵称',
  },
  {
    field: 'status',
    label: '状态',
  },
  {
    field: 'gender',
    label: '性别',
  },
  {
    field: 'email',
    label: '邮箱',
  },
  {
    field: 'phoneNo',
    label: '手机号',
  },
  {
    field: 'lastLoginAt',
    label: '最后登录时间',
  },
  {
    field: 'createdAt',
    label: '创建时间',
  },
  {
    field: 'updatedAt',
    label: '更新时间',
  },
];

/**
 * 新增/编辑表单
 */
const isUpdateView = (values: Recordable) => {
  return !!values.id;
};
export const insertOrUpdateFormSchema: FormSchema[] = [
  {
    field: 'id',
    // 只是为了带过来
    label: '主键ID',
    component: 'Render',
    ifShow: false,
  },
  {
    field: 'username',
    label: '账号',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '最短6位，最长16位',
      maxlength: 16,
    },
    rules: [
      // 最短6位
      {
        trigger: 'blur',
        min: 2,
      },
    ],
  },
  {
    field: 'passwordOfNewUser',
    label: '密码',
    required: true,
    component: 'InputPassword',
    componentProps: {
      placeholder: '最短8位，最长20位；建议使用复杂密码',
      maxlength: 20,
    },
    rules: [
      // 最短8位
      {
        trigger: 'blur',
        min: 8,
      },
    ],
    // Helio: 只在新增时显示
    ifShow: ({ values }) => !isUpdateView(values),
  },
  {
    field: 'nickname',
    label: '昵称',
    required: true,
    component: 'Input',
    componentProps: {
      maxlength: 100,
    },
  },
  {
    field: 'status',
    label: '状态',
    required: false,
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '封禁', value: 0 },
        { label: '正常', value: 1 },
      ],
    },
  },
  {
    field: 'gender',
    label: '性别',
    required: false,
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '未知', value: 0 },
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
  },
  {
    field: 'email',
    label: '邮箱',
    required: true,
    component: 'Input',
    componentProps: {
      maxlength: 255,
    },
  },
  {
    field: 'phoneNo',
    label: '手机号',
    required: true,
    component: 'Input',
    componentProps: {
      maxlength: 20,
    },
  },
  {
    field: 'deptId',
    label: '所属部门',
    required: false,
    component: 'TreeSelect',
  },
];
