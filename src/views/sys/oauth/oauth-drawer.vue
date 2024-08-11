<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './data';
  import { useDrawerInner } from '@/components/Drawer';
  import { ProviderInfo } from '@/api/sys/model/oauthModel';
  import { createProviderApi, updateProviderApi } from '@/api/sys/SysOauthApi';
  import BasicDrawer from '@/components/Drawer/src/BasicDrawer.vue';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });

    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      await setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '添加' : '编辑'));

  async function handleSubmit() {
    const values = await validate();
    setDrawerProps({ confirmLoading: true });
    // defined provider id
    let providerId: number;
    if (unref(isUpdate)) {
      providerId = Number(values['id']);
    } else {
      providerId = 0;
    }
    let params: ProviderInfo = {
      id: providerId,
      name: values['name'],
      clientID: values['clientID'],
      clientSecret: values['clientSecret'],
      redirectUrl: values['redirectUrl'],
      scopes: values['scopes'],
      authUrl: values['authUrl'],
      tokenUrl: values['tokenUrl'],
      infoUrl: values['infoUrl'],
      authStyle: values['authStyle'],
      // createdAt: 0, // do not need to set
    };
    if (params.id == 0) {
      createProviderApi(params)
        .then(() => {
          closeDrawer();
          emit('success');
        })
        .catch(() => {
          setDrawerProps({ confirmLoading: false });
        });
    } else {
      updateProviderApi(params)
        .then(() => {
          closeDrawer();
          emit('success');
        })
        .catch(() => {
          setDrawerProps({ confirmLoading: false });
        });
    }
  }
</script>
