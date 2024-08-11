<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加字典详情 </a-button>
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
                  title: '确认删除字典详情?',
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
  import { useDrawer } from '@/components/Drawer';
  import { useMessage } from '@/hooks/web/useMessage';
  import { deleteDictionaryApi, getDictionaryDetailListApi } from '@/api/sys/SysDictionaryApi';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { detailColumns } from '@/views/sys/dictionary/data';
  import DictionaryDrawer from '@/views/sys/dictionary/detailDrawer.vue';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const { notification } = useMessage();

  const [registerTable, { reload }] = useTable({
    title: '字典详情管理',
    api: getDictionaryDetailListApi,
    columns: detailColumns,
    formConfig: {
      labelWidth: 120,
      schemas: [
        {
          field: 'name',
          label: '字典名称',
          component: 'Input',
          colProps: { span: 8 },
          rules: [{ max: 10 }],
        },
      ],
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

  function handleDelete(record: Recordable) {
    deleteDictionaryApi({ ID: record.id }).then(() => {
      notification.success({
        message: '删除成功',
        description: '删除成功',
        duration: 3,
      });
      reload();
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
