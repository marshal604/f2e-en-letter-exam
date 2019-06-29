import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from '@config/config.component';
import { ConfigListComponent } from '@config/config-list/config-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: ConfigComponent,
    children: [
      { path: 'list', component: ConfigListComponent },
      { path: 'exam', loadChildren: '@config/exam-config/exam-config.module.ts#ExamConfigModule' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule {}
