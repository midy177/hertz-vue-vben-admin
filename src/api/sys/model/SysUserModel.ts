export interface UserListReq {
  page: number;
  pageSize: number;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
}

export interface UserInfo {
  ID: number; // 用户ID
  avatar: string; // 用户头像
  roleID: number; // 角色ID
  mobile: string; // 手机号码
  email: string; // 邮箱地址
  status: number; // 用户状态
  username: string; // 用户名
  nickname: string; // 昵称
  roleName: string; // 角色名称
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
  roleValue: string; // 角色值
  sideMode: string; // 侧边栏模式
}

export interface CreateOrUpdateUserReq {
  ID: number; // 用户ID
  avatar: string; // 用户头像
  roleID: number; // 角色ID
  mobile: string; // 手机号码
  email: string; // 邮箱地址
  status: number; // 用户状态
  username: string; // 用户名
  nickname: string; // 昵称
  password: string; // 密码
}

export interface UserProfile {
  avatar: string;
  nickname: string;
  email: string;
  mobile: string;
}
