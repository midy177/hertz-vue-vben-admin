<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '确认删除？',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DictionaryDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { columns, searchFormSchema } from './data';
  import { useDrawer } from '@/components/Drawer';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import DictionaryDrawer from '@/views/sys/dictionary/detailDrawer.vue';
  import { deleteDictionaryApi, getDictionaryListApi } from '@/api/sys/SysDictionaryApi';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '字典管理',
    api: getDictionaryListApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
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
      width: 30,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    deleteDictionaryApi({ ID: record.id }).then(() => {
      reload();
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
