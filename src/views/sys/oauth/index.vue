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
    <OauthDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import OauthDrawer from './oauth-drawer.vue';
  import { useI18n } from 'vue-i18n';
  import { columns } from './data';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import { deleteProviderApi, getProviderListApi } from '@/api/sys/SysOauthApi';

  const { t } = useI18n();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: t('sys.oauth.providerList'),
    api: getProviderListApi,
    fetchSetting: {
      listField: 'data',
      totalField: 'total',
    },
    columns,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 30,
      title: t('common.action'),
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
    deleteProviderApi({ ID: record.id }).then(() => {
      reload();
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
