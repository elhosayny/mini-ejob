import { AuthGuard } from './auth/auth.guard';
import { MainComponent } from './dashboard/main/main.component';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';

const routes: Routes = [
  //{ path:'' ,redirectTo:'/user/login' ,pathMatch:'full' },
  { path:'',component:MainComponent,canActivate:[AuthGuard] },
  { path:'user/register',component:RegistrationComponent },
  { path:'user/login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
