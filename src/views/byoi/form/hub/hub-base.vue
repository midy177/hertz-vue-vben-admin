<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { HubSchemas } from '@/views/byoi/form/hub/hub-data';

  const [register, { validate, setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: HubSchemas,
    showActionButtonGroup: false,
  });
  defineExpose({
    validate,
    setFieldsValue,
  });
</script>

<template>
  <BasicForm @register="register" />
</template>

<style scoped lang="less"></style>
