/**
 *  author: Ryan Su
 *  @description: provider info response
 */

export interface ProviderInfo {
  id: number; // 供应商 ID
  name: string; // 供应商名称
  clientID: string; // 客户端 ID
  clientSecret: string; // 客户端密钥
  redirectUrl: string; // 重定向 URL
  scopes: string; // 权限范围
  authUrl: string; // 授权 URL
  tokenUrl: string; // 令牌 URL
  authStyle: number; // 授权风格
  infoUrl: string; // 信息 URL
  createdAt?: string; // 创建时间
  updatedAt?: string; // 更新时间
}

/**
 *  author: Ryan Su
 *  @description: Oauth log in request parameters
 */
export interface OauthLoginReq {
  state: string;
  provider: string;
}

/**
 * @description: Login interface return value
 */
export interface OauthLoginResp {
  code: number;
  token: string;
  expire: string;
}

/**
 *  author: Ryan Su
 *  @description: redirect information
 */
export interface RedirectInfo {
  url: string;
}
