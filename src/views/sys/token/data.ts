import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useMessage } from '@/hooks/web/useMessage';
import { setTokenStatus } from '@/api/sys/SysTokenApi';
import { formatToDateTime } from '@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '账号名',
    dataIndex: 'userName',
    width: 200,
  },
  // {
  //   title: 'UUID',
  //   dataIndex: 'UUID',
  //   width: 200,
  // },
  // {
  //   title: 'Token',
  //   dataIndex: 'token',
  //   width: 200,
  // },
  {
    title: '来源',
    dataIndex: 'source',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          setTokenStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success('更新成功');
            })
            .catch(() => {
              createMessage.error('更新失败');
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
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: '过期时间',
    dataIndex: 'expiredAt',
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.expiredAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'UUID',
    label: 'UUID',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'username',
    label: '账号名',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 50 }],
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 20 }],
  },
];
