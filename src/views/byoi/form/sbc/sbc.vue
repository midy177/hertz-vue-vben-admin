<script setup lang="ts">
  import SbcBase from '@/views/byoi/form/sbc/sbc-base.vue';
  import { Card, Button } from 'ant-design-vue';
  import { ComponentPublicInstance, nextTick, onMounted, reactive } from 'vue';
  import { nanoid } from 'nanoid';

  const state = reactive({
    first: nanoid(),
    sbcList: [] as string[],
    sbcRefMap: new Map<string, Element | ComponentPublicInstance | null>(),
  });

  function setSbcRef(item: string, el: Element | ComponentPublicInstance | null) {
    if (el) {
      state.sbcRefMap.set(item, el);
    }
  }
  function addSbc() {
    const id = nanoid();
    state.sbcList.push(id);
  }
  function removeSbc(item: string) {
    state.sbcList = state.sbcList.filter((i) => i !== item);
    const el = state.sbcRefMap.get(item);
    if (el) {
      state.sbcRefMap.delete(item);
    }
  }

  async function validates(): Promise<Recordable<any>[]> {
    let validateResultList: Recordable<any>[] = [];
    for (const item of state.sbcList) {
      const el = state.sbcRefMap.get(item);
      if (el) {
        try {
          const validateResult = await (el as InstanceType<typeof SbcBase>).validate();
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
      return Promise.reject('sbc列表为空');
    }
  }

  async function setFieldsValues(values: Recordable<any>[]): Promise<void> {
    if (values.length === 0) {
      return Promise.reject('values为空');
    }
    state.sbcList = [];
    state.sbcRefMap.clear();
    for (let i = 0; i < values.length; i++) {
      state.sbcList.push(nanoid());
    }
    setTimeout(async () => {
      for (const [index, item] of state.sbcList) {
        const el = state.sbcRefMap.get(item);
        if (el) {
          await (el as InstanceType<typeof SbcBase>).setFieldsValue(values[index]);
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
        state.sbcList.push(state.first);
      }, 100);
    });
  });
</script>

<template>
  <Card title="SBC配置">
    <template #extra>
      <Button type="primary" size="small" @click="addSbc">再加一台SBC</Button>
    </template>
    <template v-for="(item, index) in state.sbcList" :key="index">
      <a-divider orientation="left">
        SBC {{ index + 1 }}
        <Button v-if="item != state.first" type="text" danger size="small" @click="removeSbc(item)">
          移除
        </Button>
      </a-divider>
      <SbcBase :ref="(el: Element | ComponentPublicInstance | null) => setSbcRef(item, el)" />
    </template>
  </Card>
</template>

<style scoped lang="less"></style>
