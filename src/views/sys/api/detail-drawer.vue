<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="查看详情" width="40%">
    <Description
      size="default"
      title=""
      :bordered="true"
      :column="1"
      :data="record"
      :schema="retrieveDetailFormSchema"
    />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { Description } from '@/components/Description';
  import { retrieveDetailFormSchema } from './data';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const emit = defineEmits(['register']);
  const record = ref({});

  const [registerDrawer] = useDrawerInner(async (data) => {
    record.value = data.record;
  });
</script>
