import { NgModule } from '@angular/core';

import { ExamComponent } from './exam.component';
import { SharedModule } from '@shared/shared.module';
import { ExamRoutingModule } from './exam-routing.module';

@NgModule({
  imports: [SharedModule, ExamRoutingModule],
  declarations: [ExamComponent]
})
export class ExamModule {}
