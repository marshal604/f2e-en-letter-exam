import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginIdentifyList, LoginIdentify } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  identifyList: LoginIdentifyList[];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initIdentifyList();
  }

  onIdentifyLogin(id: LoginIdentify) {
    switch (id) {
      case LoginIdentify.Facebook:
        break;
      case LoginIdentify.Google:
        break;
      case LoginIdentify.Other:
        this.router.navigate(['../other-identify-login'], { relativeTo: this.route });
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
