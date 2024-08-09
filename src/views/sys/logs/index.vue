<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!--    新增按钮    -->
        <a-button
          v-if="hasPermission('SysUser:create')"
          type="primary"
          danger
          @click="handleDeleteAll"
        >
          清空日志
        </a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, queryFormSchema } from './data';
  import { deleteAllSysLogApi, listSysLogApi } from '@/api/sys/SysLogApi';
  import { hasPermission } from '@/utils/auth';

  const [registerTable, { reload }] = useTable({
    title: '系统日志',
    api: listSysLogApi,
    columns,
    fetchSetting: {
      listField: 'data',
      totalField: 'total',
    },
    formConfig: {
      /*
      列表查询条件
       */
      // 输入框左侧标题的宽度
      labelWidth: 120,
      // 查询条件配置
      schemas: queryFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
  });
  const handleDeleteAll = () => {
    deleteAllSysLogApi().finally(reload);
  };
</script>
