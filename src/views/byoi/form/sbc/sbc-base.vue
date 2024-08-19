<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { SbcSchemas } from '@/views/byoi/form/sbc/sbc-data';

  const [register, { validate, setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: SbcSchemas,
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
