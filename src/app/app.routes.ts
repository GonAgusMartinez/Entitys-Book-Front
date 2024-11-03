import { Routes } from '@angular/router';
import { LandingComponent } from '../Components/Landingpage/landing.component';
import { LoginComponent } from '../Components/Login/Login.component';
import { HomepageComponent } from '../Components/Homepage/Homepage.component';

export const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
];
