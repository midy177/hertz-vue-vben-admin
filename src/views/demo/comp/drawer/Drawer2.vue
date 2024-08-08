<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="Drawer Title" width="50%">
    Drawer Info.
    <a-button type="primary" @click="closeDrawer"> 内部关闭drawer </a-button>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const emit = defineEmits(['register']);
  const [register, { closeDrawer }] = useDrawerInner();
</script>
