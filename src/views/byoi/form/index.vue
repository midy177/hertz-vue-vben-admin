<template>
  <PageWrapper :title="getShowHeader">
    <Space direction="vertical" class="w-full h-full">
      <Base />
      <CM />
      <SBC />
      <PROXY />
      <HUB />
    </Space>
    <template #rightFooter v-if="props.showFooter">
      <Space>
        <a-button type="primary" danger @click="props.cancel">取消</a-button>
        <a-button type="primary">提交</a-button>
      </Space>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Space } from 'ant-design-vue';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Base from '@/views/byoi/form/base/base.vue';
  import CM from '@/views/byoi/form/cm/cm.vue';
  import SBC from '@/views/byoi/form/sbc/sbc.vue';
  import PROXY from '@/views/byoi/form/proxy/proxy.vue';
  import HUB from '@/views/byoi/form/hub/hub.vue';
  import {computed} from "vue";
  const props = defineProps({
    cancel: {
      type: Function,
      default: () => {},
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    }
  })

  const getShowHeader = computed(
    () => props.showFooter ? 'BYOI安装申请表单' : undefined,
  );
</script>
<style scoped></style>
