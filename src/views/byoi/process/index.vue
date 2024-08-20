<template>
  <PageWrapper class="page-wrapper">
    <Card title="流程配置" class="w-xl">
      <BasicForm @register="registerForm" />
      <FormItem :wrapper-col="{ offset: 20, span: 0 }">
        <a-button type="primary" html-type="submit">保存</a-button>
      </FormItem>
    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
import {Card, FormItem} from 'ant-design-vue';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import {BasicForm, FormSchema, useForm} from "@/components/Form";


  const formSchema: FormSchema[] = [
    {
      field: 'sshCheck',
      component: 'Switch',
      label: '提交表单时执行ssh联通性检查',
      defaultValue: false,
      componentProps: {
        checkedChildren: '启用',
        unCheckedChildren: '关闭',
      },
      required: true,
    },
    {
      field: 'portCheck',
      component: 'Switch',
      label: '提交表单时执行端口检查',
      defaultValue: false,
      componentProps: {
        checkedChildren: '启用',
        unCheckedChildren: '关闭',
      },
      required: true,
    },
    {
      field: 'insCheck',
      component: 'Switch',
      label: '提交表单时执行安装前检查脚本',
      defaultValue: false,
      componentProps: {
        checkedChildren: '启用',
        unCheckedChildren: '关闭',
      },
      required: true,
    },
  ];

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 220,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

</script>
<style scoped>
.page-wrapper {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
