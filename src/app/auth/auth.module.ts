import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from '@auth/login/login.component';
import { OtherIdentifyLoginComponent } from '@auth/other-identify-login/other-identify-login.component';
import { AuthComponent } from '@auth/auth.component';

@NgModule({
  imports: [SharedModule, AuthRoutingModule, CoreModule],
  declarations: [LoginComponent, OtherIdentifyLoginComponent, AuthComponent]
})
export class AuthModule {}
