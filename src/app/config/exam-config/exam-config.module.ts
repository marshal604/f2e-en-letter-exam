import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ExamConfigComponent } from './exam-config.component';
import { ExamTestConfigComponent } from './exam-test-config/exam-test-config.component';
import { ExamConfigRoutingModule } from './exam-routing.module';
import { ExamTestQuestionInputComponent } from './exam-test-config/exam-test-question-input/exam-test-question-input.component';
import { ExamTestConfigInputComponent } from './exam-test-config/exam-test-config-input/exam-test-config-input.component';
import { ExamTestConfigLimitInputComponent } from './exam-test-config/exam-test-config-input/exam-test-config-limit-input/exam-test-config-limit-input.component';

@NgModule({
  imports: [SharedModule, ExamConfigRoutingModule],
  declarations: [
    ExamConfigComponent,
    ExamTestConfigComponent,
    ExamTestQuestionInputComponent,
    ExamTestConfigInputComponent,
    ExamTestConfigLimitInputComponent
  ]
})
export class ExamConfigModule {}
