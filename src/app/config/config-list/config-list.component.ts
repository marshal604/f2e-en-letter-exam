import { Component, OnInit } from '@angular/core';

import { NormalItem } from '@shared/models/item.model';

@Component({
  selector: 'yur-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.scss']
})
export class ConfigListComponent implements OnInit {
  configList: NormalItem[];
  constructor() {}

  ngOnInit() {
    this.initConfigList();
  }

  onNavigateTo() {}

  private initConfigList() {
    this.configList = [
      {
        id: 'add-exam',
        name: '新增題庫'
      }
    ];
  }
}
