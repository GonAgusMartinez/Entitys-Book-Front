import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
        <button (click)="scrollToLogin()">Iniciar</button>
        <button (click)="scrollToRegister()">Registrarse</button>
      </div>
    </div>
  `,
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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

  scrollToLogin() {
    if (isPlatformBrowser(this.platformId)) {
      document
        .querySelector('.login-container')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToRegister() {
    // Lógica para el botón de "Registrarse" (puedes ajustar esta función según la ruta de registro)
    if (isPlatformBrowser(this.platformId)) {
      document
        .querySelector('.register-container')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
