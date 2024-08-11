<template>
  <PageWrapper>
    <Card title="个人信息" style="width: 100%">
      <Form
        :model="formData"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @submit="handleSubmit()"
      >
        <FormItem label="头像" name="avatar">
          <Avatar
            size="large"
            :style="{ backgroundColor: '#7265e6', verticalAlign: 'middle', cursor: 'pointer' }"
            :gap="4"
            :src="formData.avatar ? formData.avatar : ''"
            @click="handleChangeAvatar"
          >
            {{ formData.avatar ? formData.avatar : formData.nickname }}
          </Avatar>
          <!--          <a-input v-model:value="formData.avatar" />-->
        </FormItem>

        <FormItem label="昵称" name="nickname" :rules="[{ required: true }]">
          <a-input v-model:value="formData.nickname" />
        </FormItem>

        <FormItem label="手机" name="mobile"> <a-input v-model:value="formData.mobile" /></FormItem>

        <FormItem label="邮箱" name="email" :rules="[{ required: true }]">
          <a-input v-model:value="formData.email"
        /></FormItem>

        <FormItem :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">保存</a-button>
        </FormItem>
      </Form>
    </Card>
    <Card title="修改密码" style="width: 100%">
      <Form
        :model="changePasswordReq"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @submit="handleChangePasswordSubmit()"
      >
        <FormItem label="旧密码" name="oldPassword" :rules="[{ required: true }]">
          <a-input-password v-model:value="changePasswordReq.oldPassword"
        /></FormItem>

        <FormItem label="新密码" name="newPassword" :rules="[{ required: true }]">
          <a-input-password v-model:value="changePasswordReq.newPassword"
        /></FormItem>

        <FormItem :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">保存</a-button>
        </FormItem>
      </Form>
    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Avatar, Card, Form, FormItem, message } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import { reactive } from 'vue';
  import { changePasswordApi, getUserProfile, updateProfile } from '@/api/sys/SysUserApi';
  import { ChangePasswordReq, UserProfile } from '@/api/sys/model/SysUserModel';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';

  const userStore = useUserStore();
  const formData = reactive<UserProfile>({
    avatar: '',
    nickname: '',
    email: '',
    mobile: '',
  });
  const changePasswordReq = reactive<ChangePasswordReq>({
    userID: userStore.getUserInfo.ID,
    oldPassword: '',
    newPassword: '',
  });

  async function getProfile() {
    const res = await getUserProfile();
    formData.avatar = res.avatar;
    formData.nickname = res.nickname;
    formData.email = res.email;
    formData.mobile = res.mobile;
  }

  getProfile();

  function handleSubmit() {
    updateProfile(formData).then(() => {
      message.success('更新成功', 3);
    });
  }

  function handleChangePasswordSubmit() {
    changePasswordApi(changePasswordReq).then(() => {
      message.success('修改成功', 3);
    });
  }
  function handleChangeAvatar() {
    // 创建一个 <input> 元素，设置类型为 "file"
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*'; // 只接受图片文件

    // 监听文件选择事件
    inputElement.addEventListener('change', () => {
      const file = inputElement.files?.[0]; // 获取第一个文件

      if (file) {
        compressImageToBase64(file, 0.8)
          .then((base64) => {
            formData.avatar = base64;
          })
          .catch((err) => {
            message.error('压缩图片失败' + err);
          });
      }
    });

    // 模拟点击以打开文件选择对话框
    inputElement.click();
  }
  /**
   * 压缩图片并返回 Base64 编码
   * @param file 需要压缩的图片文件
   * @param quality 压缩质量（0 到 1 之间）
   * @param width 调整后宽度
   * @param height 调整后高度
   * @returns 返回压缩后的 Base64 编码字符串
   */
  async function compressImageToBase64(
    file: File,
    quality: number = 1,
    width: number = 128,
    height: number = 128,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            // 根据图片原始尺寸调整画布尺寸
            canvas.width = width;
            canvas.height = height;

            // 将图片绘制到画布上
            ctx.drawImage(img, 0, 0, width, height);

            // 压缩图片并获取 Base64 编码
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedBase64);
          } else {
            reject(new Error('无法获取 Canvas 上下文'));
          }
        };

        img.onerror = (err) => {
          reject(new Error('图片加载失败' + err));
        };
      };

      reader.onerror = (err) => {
        reject(new Error('文件读取失败' + err));
      };

      reader.readAsDataURL(file);
    });
  }
</script>
