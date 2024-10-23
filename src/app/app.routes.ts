import { Routes } from '@angular/router';
import { LandingComponent } from '../Components/Landingpage/landing.component';
import { LoginComponent } from '../Components/Login/Login.component';

export const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
];
