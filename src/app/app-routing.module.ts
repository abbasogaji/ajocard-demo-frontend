import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { MainGuard } from './main/main.guard';


const routes: Routes = [
  {
    path: '', component : MainComponent, canActivate : [MainGuard]
  },
  {
    path : 'auth/login', component : LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
