import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AES } from 'crypto-js';

import { ApolloService } from '@core/services/apollo.service';
import { QUERY_LOGIN_WITH_OAUTH, QUERY_LOGIN } from './auth.graphql';
import { LoginRequest, LoginOAuthRequest, UserInfo } from '@gql-models/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  secretKey = 'ImYurSecretKey';
  constructor(private apolloService: ApolloService) {}

  identifyWithFb() {}

  encrypt(text: string): string {
    const encrypt = AES.encrypt(text, this.secretKey);
    return encrypt.toString();
  }

  decrypt(text: string): string {
    const decrypt = AES.decrypt(text, this.secretKey);
    return decrypt.toString();
  }

  doLogin(req: LoginRequest): Observable<UserInfo> {
    return this.apolloService
      .getApollo()
      .query<{ Login: UserInfo }>({
        query: QUERY_LOGIN,
        variables: {
          req
        }
      })
      .pipe(map(({ data }) => data.Login));
  }

  doLoginWithOAuth(req: LoginOAuthRequest): Observable<UserInfo> {
    return this.apolloService
      .getApollo()
      .query<{ LoginWithOAuth: UserInfo }>({
        query: QUERY_LOGIN_WITH_OAUTH,
        variables: {
          req
        }
      })
      .pipe(map(({ data }) => data.LoginWithOAuth));
  }
}
