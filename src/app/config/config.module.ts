import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ConfigComponent } from '@config/config.component';
import { ConfigRoutingModule } from '@config/config-routing.module';
import { ConfigListComponent } from '@config/config-list/config-list.component';

@NgModule({
  imports: [SharedModule, ConfigRoutingModule],
  declarations: [ConfigComponent, ConfigListComponent]
})
export class ConfigModule {}
