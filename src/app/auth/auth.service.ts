import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HmacSHA1 } from 'crypto-js';

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
    const encrypt = HmacSHA1(text, this.secretKey);
    return encrypt.toString();
  }

  doLogin(req: LoginRequest): Promise<UserInfo> {
    req.password = this.encrypt(req.password);
    return this.apolloService
      .getApollo()
      .query<{ Login: UserInfo }>({
        query: QUERY_LOGIN,
        variables: {
          req
        }
      })
      .pipe(map(({ data }) => data.Login))
      .toPromise();
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
