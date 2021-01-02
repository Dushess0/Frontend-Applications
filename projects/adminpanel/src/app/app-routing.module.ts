import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { CallbackUrlPageComponent } from './callback-url/callback-url-page.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    canActivate: [AuthGuardService],
    pathMatch: 'full',
  },
  {
    path: 'callback-url',
    component: CallbackUrlPageComponent,
  },
  {
    path: '**',
    component: ForbiddenPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
