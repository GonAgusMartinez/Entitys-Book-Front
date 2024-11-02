import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="tab-container">
        <button (click)="showLoginForm = true">Iniciar Sesión</button>
        <button (click)="showLoginForm = false">Registrar Usuario</button>
      </div>
      <form *ngIf="showLoginForm; else registerForm" (ngSubmit)="onSubmit()">
        <h2>Iniciar Sesión</h2>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          [(ngModel)]="email"
          name="email"
          placeholder="Email"
          required
        />
        <label for="password">Contraseña</label>
        <input
          id="password"
          type="password"
          [(ngModel)]="password"
          name="password"
          placeholder="Contraseña"
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <ng-template #registerForm>
        <form (ngSubmit)="onRegister()">
          <h2>Registrar Usuario</h2>
          <label for="username">Nombre de Usuario</label>
          <input
            id="username"
            type="text"
            [(ngModel)]="username"
            name="username"
            placeholder="Nombre de Usuario"
            required
          />
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            [(ngModel)]="email"
            name="email"
            placeholder="Email"
            required
          />
          <label for="password">Contraseña</label>
          <input
            id="password"
            type="password"
            [(ngModel)]="password"
            name="password"
            placeholder="Contraseña"
            required
          />
          <label for="profilePicture">Foto de Perfil</label>
          <input
            id="profilePicture"
            type="file"
            (change)="onFileSelected($event)"
          />
          <button type="submit">Registrar</button>
        </form>
      </ng-template>
    </div>
  `,
  styleUrls: ['./Login.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  showLoginForm: boolean = true;
  email: string = '';
  password: string = '';
  username: string = '';
  profilePicture: File | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('login-page-active');
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('login-page-active');
    }
  }

  onSubmit() {
    console.log('Iniciar sesión con:', this.email, this.password);
  }

  onRegister() {
    console.log(
      'Registrar usuario con:',
      this.username,
      this.email,
      this.password
    );
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this.profilePicture = fileInput.files[0];
      console.log('Foto de perfil seleccionada:', this.profilePicture.name);
    }
  }
}
