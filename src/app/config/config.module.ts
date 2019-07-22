import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ConfigComponent } from '@config/config.component';
import { ConfigRoutingModule } from '@config/config-routing.module';
import { ConfigListComponent } from '@config/config-list/config-list.component';
import { ConfigManageComponent } from '@config/config-manage/config-manage.component';
import { ConfigTableComponent } from '@config/config-table/config-table.component';

@NgModule({
  imports: [SharedModule, ConfigRoutingModule],
  declarations: [ConfigComponent, ConfigListComponent, ConfigManageComponent, ConfigTableComponent]
})
export class ConfigModule {}
