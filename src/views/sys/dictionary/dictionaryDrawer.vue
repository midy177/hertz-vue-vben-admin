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
    <template v-if="isUpdate" #extra>
      <a-button type="primary" style="margin-right: 8px" @click="handleOpenDetail">值</a-button>
    </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { useGo } from '@/hooks/web/usePage';
  import { computed, ref, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from '@/views/sys/dictionary/data';
  import { useDrawerInner } from '@/components/Drawer';
  import { DictionaryInfo } from '@/api/sys/model/dictionaryModel';
  import { createDictionaryApi, updateDictionaryApi } from '@/api/sys/SysDictionaryApi';
  import BasicDrawer from '@/components/Drawer/src/BasicDrawer.vue';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const go = useGo();
  const dictionaryName = ref<string>('');
  const dictionaryId = ref<number>(0);

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
      dictionaryName.value = data.record.name;
      dictionaryId.value = data.record.ID;
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '添加' : '编辑'));

  function handleOpenDetail() {
    go('/sys/dictionary/detail?id=' + dictionaryId.value + '&name=' + dictionaryName.value);
  }

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
    let params: DictionaryInfo = {
      ID: dictId,
      title: values['title'],
      name: values['name'],
      description: values['description'],
      status: values['status'],
    };
    if (params.ID == 0) {
      createDictionaryApi(params)
        .then(() => {
          closeDrawer();
          emit('success');
        })
        .finally(() => {
          setDrawerProps({ confirmLoading: false });
        });
    } else {
      updateDictionaryApi(params)
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
