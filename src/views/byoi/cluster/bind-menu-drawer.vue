<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="绑定菜单"
    width="40%"
    @ok="handleSubmit"
  >
    <p class="text-warning text-center">新授予的权限需要重新登录后才显示；收回的权限立即生效</p>
    <Tabs v-model:activeKey="activeKey" centered>
      <TabPane key="1" tab="菜单">
        <Tree
          v-model:checkedKeys="checkedMenuKeys"
          :onCheck="onCheck"
          checkable
          :height="600"
          :tree-data="treeMenuData"
          :checkStrictly="true"
        />
      </TabPane>
      <TabPane key="2" tab="API接口">
        <Tree
          v-model:checkedKeys="checkedApiKeys"
          checkable
          :height="600"
          :tree-data="treeApiData"
        />
      </TabPane>
    </Tabs>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Tabs, TabPane, Tree } from 'ant-design-vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { DataNode } from 'ant-design-vue/es/tree';
  import {
    convertApiCheckedKeysToReq,
    convertApiToCheckedKeys,
    convertApiTreeData,
    convertMenuTreeData,
  } from '@/views/sys/role/data';
  import {
    updateMenuAuthorityApi,
    getApiAuthorityApi,
    getApiList,
    getMenuAuthorityApi,
    updateApiAuthorityApi,
  } from '@/api/sys/SysApiAuthority';
  import { ApiAuthorityInfo, ApiInfo } from '@/api/sys/model/SysApiModel';
  import { BaseListResp } from '@/api/model/baseModel';
  import { listAllMenuApi } from '@/api/sys/SysMenuApi';

  let recordId: number;
  const activeKey = ref('1');
  // defined menu items
  const checkedMenuKeys = ref<number[]>([]);
  const treeMenuData = ref<DataNode[]>([]);
  const allCheckedKeys = ref<number[]>([]);

  // defined api items
  const checkedApiKeys = ref<number[]>([]);
  const treeApiData = ref<DataNode[]>([]);
  let apiData: BaseListResp<ApiInfo> = { data: [], total: 0 };
  async function getMenuData() {
    try {
      treeMenuData.value = [];
      const res = await listAllMenuApi();
      const dataConv = convertMenuTreeData(res.data);
      for (const key in dataConv) {
        treeMenuData.value.push(dataConv[key]);
      }
      // const roleId = await validate();
      const checkedData = await getMenuAuthorityApi({ ID: recordId });
      checkedMenuKeys.value = checkedData.MenuIDs;
    } catch (error) {
      console.log(error);
    }
  }
  async function getApiData() {
    try {
      treeApiData.value = [];
      apiData = await getApiList({
        page: 1,
        pageSize: 10000,
        path: '',
        group: '',
        method: '',
        description: '',
      });
      const dataConv = convertApiTreeData(apiData.data);
      for (const key in dataConv) {
        treeApiData.value.push(dataConv[key]);
      }
      // const roleID = await validate();
      const checkedData = await getApiAuthorityApi({ ID: recordId });
      checkedApiKeys.value = convertApiToCheckedKeys(checkedData.data, apiData.data);
    } catch (error) {
      console.log(error);
    }
  }
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // await resetFields();
    setDrawerProps({ confirmLoading: false });
    // 主键ID
    recordId = data.record?.ID || null;
    await getMenuData();
    await getApiData();
    // await setFieldsValue({
    //   ...data.record,
    // });
  });

  const emit = defineEmits(['success', 'register']);

  //父子节点问题
  function onCheck(checkedKeys, info) {
    allCheckedKeys.value = checkedKeys.checked.concat(info.halfCheckedKeys); //将父节点拼接到子节点
  }
  // 编辑角色修改
  async function handleSubmit() {
    if (activeKey.value === '1') {
      checkedMenuKeys.value = allCheckedKeys.value;
      updateMenuAuthorityApi({
        roleID: Number(recordId),
        MenuIDs: checkedMenuKeys.value,
      }).then(() => {
        emit('success');
        closeDrawer();
      });
    } else {
      const apiReqData: ApiAuthorityInfo[] = convertApiCheckedKeysToReq(
        checkedApiKeys.value,
        apiData.data,
      );
      updateApiAuthorityApi({
        roleID: Number(recordId),
        data: apiReqData,
      }).then(() => {
        emit('success');
        closeDrawer();
      });
    }
  }
</script>
<style scoped>
  .text-warning {
    font-size: 20px;
    color: red;
  }
</style>
