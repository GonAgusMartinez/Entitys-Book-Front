import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from '../Components/Landingpage/landing.component';
import { LoginComponent } from '../Components/Login/Login.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [AppComponent, LandingComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes), // Asegúrate de tener RouterModule aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
