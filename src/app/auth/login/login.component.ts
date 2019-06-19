import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginIdentifyList, LoginIdentify } from './login.model';
import { AuthService } from '@auth/auth.service';
import { FBAuthInfo } from '@auth/auth.model';
import { UserInfo } from '@gql-models/auth/auth.model';
import { UserService } from '@core/services/user.service';
declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fb: any;
  identifyList: LoginIdentifyList[];
  constructor(
    private authServcie: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initIdentifyList();
    this.initFBOauthAPI();
  }

  initFBOauthAPI() {
    if (document.getElementById('facebook-jssdk')) {
      return;
    }

    (window as any).fbAsyncInit = () => {
      (FB as any).init({
        appId: '375295463090214',
        cookie: true,
        xfbml: true,
        version: 'v3.3'
      });
      this.fb = FB;
      this.fb.AppEvents.logPageView();
      FB = undefined;
    };

    const s = document.createElement('script');
    s.src = 'https://connect.facebook.net/en_US/sdk.js';
    document.body.append(s);
  }

  checkLoginStatusWithFB() {
    this.fb.getLoginStatus(({ status }: any) => {
      if (status === 'connected') {
        this.doLoginWithOAuth(LoginIdentify.Facebook);
      } else {
        this.doFBLogin();
      }
    });
  }

  onIdentifyLogin(id: LoginIdentify) {
    switch (id) {
      case LoginIdentify.Facebook:
        this.checkLoginStatusWithFB();
        break;
      case LoginIdentify.Google:
        break;
      case LoginIdentify.Other:
        this.router.navigate(['../other-identify-login'], { relativeTo: this.route });
        break;
    }
  }

  queryFBInfo(): Promise<FBAuthInfo> {
    return new Promise(resolve => {
      this.fb.api(
        '/me',
        'GET',
        {
          fields: 'id,name,email'
        },
        res => resolve(res)
      );
    });
  }

  doFBLogin() {
    this.fb.login(
      loginStatus => {
        if (loginStatus.status !== 'connected') {
          return;
        }
        this.doLoginWithOAuth(LoginIdentify.Facebook);
      },
      { scope: 'public_profile,email' }
    );
  }

  doLoginWithOAuth(type: LoginIdentify) {
    switch (type) {
      case LoginIdentify.Facebook:
        this.queryFBInfo()
          .then(userInfo =>
            this.authServcie
              .doLoginWithOAuth({
                userId: userInfo.id,
                name: userInfo.name,
                email: userInfo.email
              })
              .toPromise()
          )
          .then((userInfo: UserInfo) => this.userService.setUserInfo(userInfo))
          .catch((err: Error) => console.log(err.message));
        break;
      case LoginIdentify.Google:
        break;
    }
  }

  private initIdentifyList() {
    this.identifyList = [
      {
        id: LoginIdentify.Facebook,
        name: '以Facebook帳號登入',
        className: 'fb',
        img: 'assets/images/login/fb-icon.png'
      },
      {
        id: LoginIdentify.Google,
        name: '以Google帳號登入',
        className: 'google',
        img: 'assets/images/login/google-icon.jpg'
      },
      {
        id: LoginIdentify.Other,
        name: '以其他方式登入',
        className: 'other',
        icon: 'person'
      }
    ];
  }
}
