<template>
  <BasicDrawer v-bind="$attrs" :isDetail="true" title="Drawer Title5">
    <p class="h-20">Content Message</p>
    <template #titleToolbar> toolbar </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer } from '@/components/Drawer';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const emit = defineEmits(['register']);
</script>
