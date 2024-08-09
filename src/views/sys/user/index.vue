<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable class="w-full xl:w-full" @register="registerTable">
      <template #toolbar>
        <!--    新增按钮    -->
        <a-button v-if="hasPermission('SysUser:create')" type="primary" @click="handleInsert">
          新增
        </a-button>
      </template>
      <template #action="{ record }">
        <!--   每行最右侧一列的工具栏   -->
        <TableAction
          :actions="[
            {
              tooltip: '编辑',
              ifShow: hasPermission('SysUser:update'),
              icon: 'clarity:note-edit-line',
              onClick: handleUpdate.bind(null, record),
            },
            {
              tooltip: '删除',
              ifShow: hasPermission('SysUser:delete'),
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
    <SysUserUpdateDrawer @register="registerUpdateDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import { hasPermission } from '@/utils/auth';
  import { columns, queryFormSchema } from './data';
  import { deleteSysUserApi, listSysUserApi } from '@/api/sys/SysUserApi';
  import SysUserUpdateDrawer from './update-drawer.vue';
  import { PageWrapper } from '@/components/Page';
  // 新增/编辑
  const [registerUpdateDrawer, { openDrawer: openUpdateDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '后台用户',
    api: listSysUserApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: queryFormSchema,
    },
    fetchSetting: {
      listField: 'data',
      totalField: 'total',
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleInsert() {
    openUpdateDrawer(true, {
      isUpdateView: false,
    });
  }
  function handleUpdate(record: Recordable) {
    openUpdateDrawer(true, {
      record,
      isUpdateView: true,
    });
  }

  async function handleDelete(record: Recordable) {
    await deleteSysUserApi(record.ID);
    await reload();
  }

  /**
   * 编辑成功后事件
   */
  function handleSuccess() {
    reload();
  }
</script>
