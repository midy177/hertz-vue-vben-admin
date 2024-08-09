import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { DescItem } from '@/components/Description';
import { formatToDateTime } from '@/utils/dateUtil';
import { RouteItem } from '@/api/sys/model/menuModel';

/**
 * 表格列
 */
export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'meta.title',
    width: 120,
    align: 'left',
    customRender: ({ record }) => {
      return record.meta.title;
    },
  },
  {
    title: '图标',
    dataIndex: 'meta.icon',
    width: 80,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.meta.icon });
    },
  },
  {
    title: '组件/外链',
    dataIndex: 'component',
    width: 240,
    customRender: ({ record }) => {
      const value = record.component;
      return 'LAYOUT' == value ? '' : value;
    },
  },
  {
    title: '是否隐藏',
    dataIndex: 'meta.hideMenu',
    width: 80,
    customRender: ({ record }) => {
      const status = record.meta.hideMenu;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    width: 50,
    customRender: ({ record }) => {
      const value = record.menuType;
      let color, text;
      switch (value) {
        case 0:
          color = 'green';
          text = '目录';
          break;
        case 1:
          color = 'blue';
          text = '菜单';
          break;
        case 2:
          color = 'cyan';
          text = '按钮';
          break;
        case 3:
          color = 'red';
          text = '外链';
          break;
      }
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '状态',
    dataIndex: 'disabled',
    width: 80,
    customRender: ({ record }) => {
      const status = record.disabled;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '禁用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

/**
 * 查询条件
 */
export const queryFormSchema: FormSchema[] = [];

/**
 * 查看详情表单
 */
export const retrieveDetailFormSchema: DescItem[] = [
  {
    field: 'meta.title',
    label: '菜单名称',
  },
  {
    field: 'meta.icon',
    label: '图标',
    render: (val: any) => {
      return h(Icon, { icon: val });
    },
  },
  {
    field: 'component',
    label: '组件',
  },
  {
    label: '是否隐藏',
    field: 'meta.hideMenu',
    render: (val: any) => {
      const enable = ~~val === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    label: '菜单类型',
    field: 'menuType',
    render: (val: any) => {
      let color, text;
      switch (val) {
        case 0:
          color = 'green';
          text = '目录';
          break;
        case 1:
          color = 'blue';
          text = '菜单';
          break;
        case 2:
          color = 'cyan';
          text = '按钮';
          break;
        case 3:
          color = 'red';
          text = '外链';
          break;
      }
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    label: '状态',
    field: 'disabled',
    render: (val: any) => {
      const enable = ~~val === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '禁用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    label: '排序',
    field: 'orderNo',
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

// const isDirectory = (type: number) => {
//   return type == 0;
// };
const isMenu = (type: number) => {
  return type == 1;
};
const isButton = (type: number) => {
  return type == 2;
};

export const insertOrUpdateFormSchema: FormSchema[] = [
  {
    field: 'menuType',
    label: '类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'ID',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
  },
  {
    field: 'parentID',
    label: '父级ID',
    component: 'TreeSelect',
    required: true,
    componentProps: {
      // set the field name of the data from the server, the below show that
      // the label show the field of data.name
      fieldNames: {
        label: 'name',
        value: 'ID',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'meta.title',
    label: '菜单名称',
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
    ifShow: ({ values }) => !isButton(values.menuType),
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
    field: 'meta.icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.menuType),
    rules: [{ max: 200 }],
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    required: true,
    rules: [{ max: 100 }],
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => isButton(values.menuType),
  },
  {
    field: 'redirect',
    label: '跳转路径',
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 100 }],
  },
  {
    field: 'meta.frameSrc',
    label: 'Iframe地址',
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 100 }],
  },
  {
    field: 'meta.dynamicLevel',
    label: '打开Tab的最大数',
    defaultValue: 20,
    component: 'InputNumber',
    required: true,
    rules: [{ type: 'number', max: 30 }],
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'meta.realPath',
    label: '固定的地址',
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 200 }],
  },
  {
    field: 'meta.currentActiveMenu',
    label: '激活窗口',
    component: 'Input',
    defaultValue: '状态',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 50 }],
  },
  {
    field: 'disabled',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '启用', value: false },
        { label: '禁用', value: true },
      ],
    },
  },
  {
    field: 'isExt',
    label: '外链',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'meta.ignoreKeepAlive',
    label: '缓存',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'meta.hideMenu',
    label: '隐藏',
    component: 'RadioButtonGroup',
    // defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'meta.hideBreadcrumb',
    label: '显示面包屑',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: false },
        { label: '否', value: true },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'meta.hideTab',
    label: '隐藏Tab',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'meta.carryParam',
    label: '携带参数',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'meta.hideChildrenInMenu',
    label: '隐藏全部子菜单',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'meta.affix',
    label: '固定Tab',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
];

const travel = (data: RouteItem[]): RouteItem[] => {
  if (data.length === 0) {
    return data;
  }
  for (let i = 0; i < data.length; i++) {
    data[i].name = data[i].meta.title;
    if (data[i].children) {
      data[i].children = travel(data[i].children);
    }
  }
  return data;
};
