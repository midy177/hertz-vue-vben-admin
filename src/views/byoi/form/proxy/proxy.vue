<script setup lang="ts">
  import { Card, Button } from 'ant-design-vue';
  import { ComponentPublicInstance, nextTick, onMounted, reactive } from 'vue';
  import { nanoid } from 'nanoid';
  import ProxyBase from '@/views/byoi/form/proxy/proxy-base.vue';

  const state = reactive({
    first: nanoid(),
    proxyList: [] as string[],
    proxyRefMap: new Map<string, Element | ComponentPublicInstance | null>(),
  });

  function setSbcRef(item: string, el: Element | ComponentPublicInstance | null) {
    if (el) {
      state.proxyRefMap.set(item, el);
    }
  }
  function addProxy() {
    const id = nanoid();
    state.proxyList.push(id);
  }
  function removeProxy(item: string) {
    state.proxyList = state.proxyList.filter((i) => i !== item);
    const el = state.proxyRefMap.get(item);
    if (el) {
      state.proxyRefMap.delete(item);
    }
  }

  async function validates(): Promise<Recordable<any>[]> {
    let validateResultList: Recordable<any>[] = [];
    for (const item of state.proxyList) {
      const el = state.proxyRefMap.get(item);
      if (el) {
        try {
          const validateResult = await (el as InstanceType<typeof ProxyBase>).validate();
          if (validateResult) {
            validateResultList.push(validateResult);
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
    if (validateResultList.length > 0) {
      return Promise.resolve(validateResultList);
    } else {
      return Promise.reject('proxy列表为空');
    }
  }

  async function setFieldsValues(values: Recordable<any>[]): Promise<void> {
    if (values.length === 0) {
      return Promise.reject('values为空');
    }
    state.proxyList = [];
    state.proxyRefMap.clear();
    for (let i = 0; i < values.length; i++) {
      state.proxyList.push(nanoid());
    }
    setTimeout(async () => {
      for (const [index, item] of state.proxyList) {
        const el = state.proxyRefMap.get(item);
        if (el) {
          await (el as InstanceType<typeof ProxyBase>).setFieldsValue(values[index]);
        }
      }
    }, 1000);
  }

  defineExpose({
    validates,
    setFieldsValues,
  });
  onMounted(() => {
    nextTick(() => {
      setTimeout(() => {
        state.proxyList.push(state.first);
      }, 400);
    });
  });
</script>

<template>
  <Card title="Proxy配置">
    <template #extra>
      <Button type="primary" size="small" @click="addProxy">再加一台PROXY</Button>
    </template>
    <template v-for="(item, index) in state.proxyList" :key="index">
      <a-divider orientation="left">
        PROXY {{ index + 1 }}
        <Button v-if="item != state.first" type="text" danger size="small" @click="removeProxy(item)">
          移除
        </Button>
      </a-divider>
      <ProxyBase :ref="(el: Element | ComponentPublicInstance | null) => setSbcRef(item, el)" />
    </template>
  </Card>
</template>

<style scoped lang="less"></style>
