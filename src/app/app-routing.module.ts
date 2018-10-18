import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LoggedInGuard } from './_guards/logged-in.guard';
import { RegisterComponent } from './register/register.component';
import { TaskComponent } from './task/task.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TaskComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: 'task',
    component: TaskComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
