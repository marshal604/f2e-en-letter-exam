import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { LoginRequest, UserInfo } from '@gql-models/auth/auth.model';
import { UserService } from '@core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'yur-other-identify-login',
  templateUrl: './other-identify-login.component.html',
  styleUrls: ['./other-identify-login.component.scss']
})
export class OtherIdentifyLoginComponent implements OnInit {
  loginForm: FormGroup;
  isDisabledLogin: boolean;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userService.getUserInfo()) {
      this.router.navigate(['exam']);
    }
    this.initForm();
  }

  onLogin() {
    this.isDisabledLogin = true;
    const req: LoginRequest = {
      account: this.loginForm.get('account').value,
      password: this.loginForm.get('password').value
    };
    this.authService
      .doLogin(req)
      .then((userInfo: UserInfo) => {
        this.userService.setUserInfo(userInfo);
        this.router.navigate(['exam']);
      })
      .catch((err: Error) => {
        alert('帳號密碼錯誤');
        this.isDisabledLogin = false;
        console.log(err.message);
      });
  }

  onEnter(event: KeyboardEvent) {
    if (event.code !== 'Enter') {
      return;
    }
    this.onLogin();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      account: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
