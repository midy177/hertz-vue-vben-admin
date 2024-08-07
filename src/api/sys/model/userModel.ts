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
  ID: number;
  avatar: string;
  roleID: number;
  mobile: string;
  email: string;
  status: number;
  username: string;
  nickname: string;
  roleName: string;
  createdAt: string;
  updatedAt: string;
  roleValue: string;
  sideMode: string;
}

export interface GetPermCodeModel {
  permissions: string[];
  roles: string[];
}
