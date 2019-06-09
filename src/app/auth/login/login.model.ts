export interface LoginIdentifyList {
  id: LoginIdentify;
  name: string;
  className: string;
  img?: string;
  icon?: string;
}

export enum LoginIdentify {
  Facebook = 1,
  Google,
  Other
}
