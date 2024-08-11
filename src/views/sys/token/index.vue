<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Button type="primary" danger v-if="showDeleteButton" @click="handleBatchDelete()">
          删除
        </Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
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
  </div>
</template>
<script lang="ts" setup>
  import { createVNode, ref } from 'vue';
  import { message, Button, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { columns, searchFormSchema } from './data';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { Key } from 'ant-design-vue/lib/table/interface';
  import { batchDeleteTokenApi, deleteTokenApi, getTokenListApi } from '@/api/sys/SysTokenApi';

  const selectedIds = ref<Key[]>();
  const showDeleteButton = ref<boolean>(false);

  const [registerTable, { reload }] = useTable({
    title: 'token管理',
    api: getTokenListApi,
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
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
      onChange: (selectedRowKeys, _) => {
        selectedIds.value = selectedRowKeys;
        showDeleteButton.value = selectedRowKeys.length > 0;
      },
    },
  });

  async function handleDelete(record: Recordable) {
    deleteTokenApi({ ID: record.ID }).then(() => {
      message.success('成功删除', 3);
      reload();
    });
  }

  function handleBatchDelete() {
    Modal.confirm({
      title: '确认删除',
      icon: createVNode(ExclamationCircleOutlined),
      onOk: () => {
        batchDeleteTokenApi({ ids: selectedIds.value as number[] }).then(() => {
          reload();
          showDeleteButton.value = false;
        });
      },
    });
  }
  // function handleSuccess() {
  //   reload();
  // }
</script>
