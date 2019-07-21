import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'exam',
    loadChildren: '@exam/exam.module.ts#ExamModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'config',
    loadChildren: '@config/config.module.ts#ConfigModule',
    canActivate: [AuthGuardService]
  }
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
