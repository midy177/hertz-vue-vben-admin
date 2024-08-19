<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!--    新增按钮    -->
        <a-button v-if="hasPermission('role:create')" type="primary" @click="handleInsert">
          新增
        </a-button>
      </template>
      <template #action="{ record }">
        <!--   每行最右侧一列的工具栏   -->
        <TableAction
          :actions="[
            {
              tooltip: '编辑',
              ifShow: hasPermission('role:update'),
              icon: 'clarity:note-edit-line',
              onClick: handleUpdate.bind(null, record),
            },
            {
              tooltip: '绑定菜单',
              ifShow: hasPermission('role:bindMenus'),
              icon: 'ant-design:setting-outlined',
              onClick: handleBindMenus.bind(null, record),
            },
            {
              tooltip: '删除',
              ifShow: hasPermission('role:delete'),
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <!--  编辑侧边抽屉  -->
    <SysRoleUpdateDrawer @register="registerUpdateDrawer" @success="handleSuccess" />
    <!--  绑定菜单侧边抽屉  -->
    <BindMenuDrawer @register="registerBindMenuDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import { hasPermission } from '@/utils/auth';
  import { columns, queryFormSchema } from './data';
  import SysRoleUpdateDrawer from './update-drawer.vue';
  import BindMenuDrawer from './bind-menu-drawer.vue';
  import { deleteByoiClusterListApi, getByoiClusterListApi } from '@/api/byoi/ByoiClusterApi';

  // 新增/编辑
  const [registerUpdateDrawer, { openDrawer: openUpdateDrawer }] = useDrawer();
  // 绑定角色
  const [registerBindMenuDrawer, { openDrawer: openBindMenuDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '集群管理',
    api: getByoiClusterListApi,
    columns,
    formConfig: {
      /*
      列表查询条件
       */
      // 输入框左侧标题的宽度
      labelWidth: 120,
      // 查询条件配置
      schemas: queryFormSchema,
    },
    fetchSetting: {
      listField: 'data',
      totalField: 'total',
    },
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 60,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  /**
   * 单击新增按钮事件
   */
  function handleInsert() {
    openUpdateDrawer(true, {
      isUpdateView: false,
    });
  }

  /**
   * 单击编辑按钮事件
   */
  function handleUpdate(record: Recordable) {
    openUpdateDrawer(true, {
      record,
      isUpdateView: true,
    });
  }

  /**
   * 单击删除按钮事件
   */
  async function handleDelete(record: Recordable) {
    await deleteByoiClusterListApi(record.ID);
    await reload();
  }

  /**
   * 编辑成功后事件
   */
  function handleSuccess() {
    reload();
  }

  /**
   * 单击绑定菜单按钮事件
   */
  function handleBindMenus(record: Recordable) {
    openBindMenuDrawer(true, {
      record,
    });
  }
</script>
