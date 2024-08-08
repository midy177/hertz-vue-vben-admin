import { defHttp } from '@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  CaptchaResultModel,
  GetPermCodeModel,
} from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Captcha = '/api/captcha',
  Login = '/api/login',
  Logout = '/api/logout',
  GetUserInfo = '/api/admin/user/info',
  GetPermCode = '/api/admin/user/perm',
  // Helio: 去除 GetPermCode 接口调用
  TestRetry = '/testRetry',
}

export function fetchCaptchaApi() {
  return defHttp.get<CaptchaResultModel>(
    {
      url: Api.Captcha,
    },
    {
      errorMessageMode: 'modal',
    },
  );
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  // Helio: mode参数竟然丢失了……手动指定一下
  mode = 'modal';
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

/**
 * @description: getUserInfo
 */
export function getPermCode() {
  return defHttp.get<GetPermCodeModel>({ url: Api.GetPermCode }, { errorMessageMode: 'none' });
}

// Helio: 去除 getPermCode 方法

export function doLogout() {
  // Helio: 登出方法改为 POST 请求
  return defHttp.post({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
