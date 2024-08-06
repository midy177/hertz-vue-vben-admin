/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  // 登录验证码（可选）
  captcha: string;
  captchaID: string;
}

// Helio: 去除 RoleInfo 结构体

/**
 * 验证码接口返回体
 */
export interface CaptchaResultModel {
  /**
   * 验证码图片Base64
   */
  imgPath: string;

  /**
   * 验证码唯一标识
   */
  captchaID: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  code: number;
  token: string;
  expire: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 昵称
  // Helio: `realName` 替换为 `nickname`
  nickname: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
