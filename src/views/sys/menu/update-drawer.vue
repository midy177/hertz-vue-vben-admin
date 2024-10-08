<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { insertOrUpdateFormSchema } from '@/views/sys/menu/data';
  import { createMenuApi, listAllMenuApi, updateMenuApi } from '@/api/sys/SysMenuApi';
  import {CreateOrUpdateMenuReq, RouteItem} from '@/api/sys/model/menuModel';

  const isUpdateView = ref(true);
  let recordId: string;
  const getTitle = computed(() => (!unref(isUpdateView) ? '新增' : '编辑'));

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 24 - 4,
    },
    // Helio: 相较于 Vben 2.3.0 版本，需要添加下面这行来修正样式
    baseColProps: { span: 24 },
    schemas: insertOrUpdateFormSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdateView.value = !!data?.isUpdateView;

    if (unref(isUpdateView)) {
      await setFieldsValue({
        ...data.record,
      });
      // 主键ID
      recordId = data.record?.ID;
    }

    // 加载：菜单下拉框数据
    let parentIdTreeData = await listAllMenuApi();
    parentIdTreeData.data.push({
      level: 0,
      name: 'root',
      ID: 1,
      menuType: 0,
      parentID: 1,
      path: '',
      redirect: '',
      component: '',
      orderNo: 0,
      disabled: false,
      children: [],
      meta: {
        title: '根路径',
        icon: '',
        hideMenu: false,
        hideBreadcrumb: false,
        currentActiveMenu: '',
        ignoreKeepAlive: false,
        hideTab: false,
        frameSrc: '',
        carryParam: false,
        hideChildrenInMenu: false,
        affix: false,
        dynamicLevel: 0,
        realPath: '',
      },
    });
    const travel = function (data: RouteItem[]): RouteItem[] {
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

    parentIdTreeData.data = travel(parentIdTreeData.data);
    await updateSchema({
      field: 'parentID',
      componentProps: {
        treeData: parentIdTreeData.data,
        // fieldNames: DEFAULT_TREE_SELECT_FIELD_NAMES,
      },
    });

    // 列表页透传的默认上级菜单
    const parent = data.parent;
    if (parent) {
      await setFieldsValue({
        parentId: parent.id,
        // 默认在上级权限后拼接":"
        permission: parent.permission ? parent.permission + ':' : null,
        // 默认设为更下一级的类型
        type: parent.type + 1,
      });
    }
  });

  const emit = defineEmits(['success', 'register']);

  async function handleSubmit() {
    try {
      // values 的字段定义见 ./data.ts 的 insertOrUpdateFormSchema
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      if (recordId) {
        // 编辑
        values.ID = recordId;
        await updateMenuApi(<CreateOrUpdateMenuReq>values);
      } else {
        // 新增
        values.ID = null;
        await createMenuApi(<CreateOrUpdateMenuReq>values);
      }

      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
