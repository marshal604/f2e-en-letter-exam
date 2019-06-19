import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamComponent } from '@exam/exam.component';
import { ExamHomeComponent } from '@exam/exam-home/exam-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: ExamComponent,
    children: [{ path: 'home', component: ExamHomeComponent }]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule {}
