import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ExamComponent } from '@exam/exam.component';
import { ExamRoutingModule } from '@exam/exam-routing.module';
import { ExamHomeComponent } from '@exam/exam-home/exam-home.component';

@NgModule({
  imports: [SharedModule, ExamRoutingModule],
  declarations: [ExamComponent, ExamHomeComponent]
})
export class ExamModule {}
