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
  import { detailSchema, dicOptionData } from '@/views/sys/dictionary/data';
  import { BasicForm, useForm } from '@/components/Form';
  import { useDrawerInner } from '@/components/Drawer';
  import {
    createDetailDictionaryApi,
    getDictionaryListApi,
    updateDictionaryDetailApi,
  } from '@/api/sys/SysDictionaryApi';
  import { DictionaryDetail } from '@/api/sys/model/dictionaryModel';
  import BasicDrawer from '@/components/Drawer/src/BasicDrawer.vue';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const dictionaryName = ref<string>('');

  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: detailSchema,
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
      dictionaryName.value = data.record.name;
    }
    const dicData = await getDictionaryListApi({
      page: 1,
      pageSize: 1000,
    });
    // 更新抽屉的角色模式
    await updateSchema({
      field: 'parentID',
      componentProps: {
        options: dicOptionData(dicData.data, 0),
      },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '添加' : '编辑'));

  async function handleSubmit() {
    const values = await validate();
    setDrawerProps({ confirmLoading: true });
    // defined dict id
    let dictId: number;
    if (unref(isUpdate)) {
      dictId = Number(values['ID']);
    } else {
      dictId = 0;
    }
    let params: DictionaryDetail = {
      ID: dictId,
      title: values['title'],
      key: values['key'],
      value: values['value'],
      status: values['status'],
      parentID: values['parentID'],
    };
    if (params.ID == 0) {
      createDetailDictionaryApi(params)
        .then(() => {
          closeDrawer();
          emit('success');
        })
        .finally(() => {
          setDrawerProps({ confirmLoading: false });
        });
    } else {
      updateDictionaryDetailApi(params)
        .then(() => {
          closeDrawer();
          emit('success');
        })
        .finally(() => {
          setDrawerProps({ confirmLoading: false });
        });
    }
  }
</script>
