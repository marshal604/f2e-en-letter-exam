import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamConfigComponent } from '@config/exam-config/exam-config.component';
import { ExamConfigAddComponent } from '@config/exam-config/exam-config-add/exam-config-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  {
    path: '',
    component: ExamConfigComponent,
    children: [{ path: 'add', component: ExamConfigAddComponent }]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamConfigRoutingModule {}
