import { NgModule } from '@angular/core';

import { ConfigComponent } from '@config/config.component';
import { ConfigRoutingModule } from '@config/config-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, ConfigRoutingModule],
  declarations: [ConfigComponent]
})
export class ConfigModule {}
