import { Injectable } from '@angular/core';

import { UserInfo } from '@gql-models/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: UserInfo;

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }

  getName(): string {
    return this.userInfo ? this.userInfo.name : 'Guest';
  }
}
