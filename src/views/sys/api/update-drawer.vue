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
  import { insertOrUpdateFormSchema } from '@/views/sys/api/data';
  import {createApiApi, updateApiApi} from "@/api/sys/SysApiApi";
  import {ApiInfo} from "@/api/sys/model/SysApiModel";

  const isUpdateView = ref(true);
  let recordId: string;
  const getTitle = computed(() => (!unref(isUpdateView) ? '新增' : '编辑'));

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
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
      recordId = data.record?.ID || null;
    }
  });

  const emit = defineEmits(['success', 'register']);

  async function handleSubmit() {
    try {
      // values 的字段定义见 ./data.ts 的 insertOrUpdateFormSchema
      const values = await validate();

      setDrawerProps({ confirmLoading: true });

      if (recordId) {
        values.ID = recordId;
        await updateApiApi(<ApiInfo>values);
      } else {
        await createApiApi(<ApiInfo>values);
      }

      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
