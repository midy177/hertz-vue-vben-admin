<script setup lang="ts">
  import { Card, Button } from 'ant-design-vue';
  import { ComponentPublicInstance, nextTick, onMounted, reactive } from 'vue';
  import { nanoid } from 'nanoid';
  import HubBase from '@/views/byoi/form/hub/hub-base.vue';

  const state = reactive({
    first: nanoid(),
    hubList: [] as string[],
    hubRefMap: new Map<string, Element | ComponentPublicInstance | null>(),
  });

  function setSbcRef(item: string, el: Element | ComponentPublicInstance | null) {
    if (el) {
      state.hubRefMap.set(item, el);
    }
  }
  function addHub() {
    const id = nanoid();
    state.hubList.push(id);
  }
  function removeHub(item: string) {
    state.hubList = state.hubList.filter((i) => i !== item);
    const el = state.hubRefMap.get(item);
    if (el) {
      state.hubRefMap.delete(item);
    }
  }
  async function validates(): Promise<Recordable<any>[]> {
    let validateResultList: Recordable<any>[] = [];
    for (const item of state.hubList) {
      const el = state.hubRefMap.get(item);
      if (el) {
        try {
          const validateResult = await (el as InstanceType<typeof HubBase>).validate();
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
      return Promise.reject('hub列表为空');
    }
  }

  async function setFieldsValues(values: Recordable<any>[]): Promise<void> {
    if (values.length === 0) {
      return Promise.reject('values为空');
    }
    state.hubList = [];
    state.hubRefMap.clear();
    for (let i = 0; i < values.length; i++) {
      state.hubList.push(nanoid());
    }
    setTimeout(async () => {
      for (const [index, item] of state.hubList) {
        const el = state.hubRefMap.get(item);
        if (el) {
          await (el as InstanceType<typeof HubBase>).setFieldsValue(values[index]);
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
        state.hubList.push(state.first);
      }, 600);
    });
  });
</script>

<template>
  <Card title="HUB配置">
    <template #extra>
      <Button type="primary" size="small" @click="addHub">再加一台HUB</Button>
    </template>
    <template v-for="(item, index) in state.hubList" :key="index">
      <a-divider orientation="left">
        HUB {{ index + 1 }}
        <Button v-if="item != state.first" type="text" danger size="small" @click="removeHub(item)">
          移除
        </Button>
      </a-divider>
      <HubBase :ref="(el: Element | ComponentPublicInstance | null) => setSbcRef(item, el)" />
    </template>
  </Card>
</template>

<style scoped lang="less"></style>
