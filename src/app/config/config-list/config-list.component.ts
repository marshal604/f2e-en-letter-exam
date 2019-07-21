import { Component, OnInit } from '@angular/core';

import { NormalItem } from '@shared/models/item.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'yur-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.scss']
})
export class ConfigListComponent implements OnInit {
  configList: NormalItem[];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.initConfigList();
  }

  onNavigateTo(pos: string) {
    this.router.navigate(['../'].concat(pos.split('/')), { relativeTo: this.activatedRoute });
  }

  private initConfigList() {
    this.configList = [
      {
        id: 'exam/add',
        name: '新增題庫'
      },
      {
        id: 'manage',
        name: '管理題庫'
      }
    ];
  }
}
