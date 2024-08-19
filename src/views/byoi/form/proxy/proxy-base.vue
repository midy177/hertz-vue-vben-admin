<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { ProxySchemas } from '@/views/byoi/form/proxy/proxy-data';

  const [register, { validate, setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: ProxySchemas,
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
