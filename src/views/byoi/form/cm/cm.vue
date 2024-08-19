<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { CMSchemas } from '@/views/byoi/form/cm/cm-data';
  import { Card } from 'ant-design-vue';

  const [register] = useForm({
    labelWidth: 120,
    schemas: CMSchemas,
    showActionButtonGroup: false,
  });
</script>

<template>
  <Card title="CM配置">
    <BasicForm @register="register" />
  </Card>
</template>

<style scoped lang="less"></style>
