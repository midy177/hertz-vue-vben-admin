<template>
  <div></div>
</template>
<script lang="ts">
  import { message } from 'ant-design-vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { PageEnum } from '@/enums/pageEnum';
  import { useUserStore } from '@/store/modules/user';
  import { oauthLoginCallbackApi } from '@/api/sys/SysOauthApi';
  import { useGo } from '@/hooks/web/usePage';

  const { currentRoute } = useRouter();
  const go = useGo();
  const query = ref<string>('');
  query.value += '?state=' + currentRoute.value.query.state;
  query.value += '&code=' + currentRoute.value.query.code;
  async function login(url: string) {
    try {
      const result = await oauthLoginCallbackApi(url);
      const token = 'Bearer ' + result.token;
      const userStore = useUserStore();
      // save token
      userStore.setToken(token);
      // 里面参数要设置为true，不然获取不到用户信息，也获取不到动态路由
      await userStore.afterLoginAction(true);
      go(PageEnum.BASE_HOME);
    } catch (e) {
      message.error('发生错误', 5);
      go(PageEnum.BASE_LOGIN);
    }
  }
  login(query.value);
</script>
