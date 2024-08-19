<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { Card } from 'ant-design-vue';
  import { BaseSchemas } from '@/views/byoi/form/base/base-data';

  const [register, { validate, setFieldsValue }] = useForm({
    labelWidth: 80,
    schemas: BaseSchemas,
    showActionButtonGroup: false,
  });
  defineExpose({
    validate,
    setFieldsValue,
  });
</script>

<template>
  <Card title="基础配置">
    <BasicForm @register="register" />
  </Card>
</template>

<style scoped lang="less"></style>
