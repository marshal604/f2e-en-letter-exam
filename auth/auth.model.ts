export interface UserInfo {
  userId: string;
  name: string;
  role: UserRole;
  email: string;
  account?: string;
  password?: string;
}

export enum UserRole {
  SuperAdministrator = 1,
  Administrator,
  Assistant,
  User
}

export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginOAuthRequest {
  userId: string;
  name: string;
  email: string;
}
