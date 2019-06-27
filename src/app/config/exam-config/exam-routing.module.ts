import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamConfigComponent } from '@config/exam-config/exam-config.component';
import { ExamTestConfigComponent } from '@config/exam-config/exam-test-config/exam-test-config.component';

const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  {
    path: '',
    component: ExamConfigComponent,
    children: [{ path: 'add', component: ExamTestConfigComponent }]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamConfigRoutingModule {}
