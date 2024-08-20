<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="70%"
    @ok="handleSubmit"
  >
    <ByoiForm :show-header="false" :show-footer="false" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import ByoiForm from '@/views/byoi/form/index.vue';

  const isUpdateView = ref(true);
  let recordId: string;
  const getTitle = computed(() => (!unref(isUpdateView) ? '新增BYOI集群' : '编辑BYOI集群'));

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
    isUpdateView.value = !!data?.isUpdateView;

    if (unref(isUpdateView)) {
      // await setFieldsValue({
      //   ...data.record,
      // });
    }

    // 主键ID
    recordId = data.record?.id || null;
  });

  const emit = defineEmits(['success', 'register']);

  async function handleSubmit() {
    try {
      // values 的字段定义见 ./data.ts 的 insertOrUpdateFormSchema
      // const values = await validate();

      setDrawerProps({ confirmLoading: true });

      if (recordId) {
        // await updateByoiClusterListApi(<ByoiClusterInfo>values)
      } else {
        // await createByoiClusterListApi(<ByoiClusterInfo>values);
      }

      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
