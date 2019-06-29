import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'exam', loadChildren: '@exam/exam.module.ts#ExamModule' },
  { path: 'config', loadChildren: '@config/config.module.ts#ConfigModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
