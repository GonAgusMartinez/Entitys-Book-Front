import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  template: `
    <div class="landing-container">
      <h1>Bienvenido a Entity's Book</h1>
      <p>
        Descubre todas las estadísticas y lore sobre los personajes de Dead By
        Daylight.
      </p>
      <div class="button-container">
        <button (click)="navigateToLogin()">Iniciar</button>
        <button (click)="navigateToRegister()">Registrarse</button>
        <button (click)="goToHome()">Invitado</button>
      </div>
    </div>
  `,
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('landing-page-active');
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('landing-page-active');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/login'], { queryParams: { register: true } });
  }

  goToHome() {
    this.router.navigate(['/homepage']);
  }
}
