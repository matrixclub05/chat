/**
 * Created by User on 14.03.2018.
 */
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from "./home/home.component";
import {LoginGuardService} from "./services/login-guard.service";


const appRoutes: Routes = [
  {path: '', component: LoginComponent,},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuardService]},
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
