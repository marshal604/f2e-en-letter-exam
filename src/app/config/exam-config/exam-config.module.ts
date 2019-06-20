import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ExamConfigComponent } from './exam-config.component';
import { ExamConfigAddComponent } from './exam-config-add/exam-config-add.component';
import { ExamConfigRoutingModule } from './exam-routing.module';

@NgModule({
  imports: [SharedModule, ExamConfigRoutingModule],
  declarations: [ExamConfigComponent, ExamConfigAddComponent]
})
export class ExamConfigModule {}
