import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateProfilePicture,
} from './Validations';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="tab-container">
        <button (click)="toggleForm(true)">Iniciar Sesión</button>
        <button (click)="toggleForm(false)">Registrar Usuario</button>
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
        <p *ngIf="errorMessage">{{ errorMessage }}</p>
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
          <p *ngIf="errorMessage">{{ errorMessage }}</p>
        </form>
      </ng-template>
    </div>
  `,
  styleUrls: ['./Login.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule, // Añadir HttpClientModule aquí
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  showLoginForm: boolean = true;
  email: string = '';
  password: string = '';
  username: string = '';
  profilePicture: File | null = null;
  errorMessage: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('login-page-active');
      this.route.queryParams.subscribe((params) => {
        if (params['register']) {
          this.showLoginForm = false;
        }
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('login-page-active');
    }
  }

  toggleForm(showLogin: boolean) {
    this.showLoginForm = showLogin;
    this.clearFormFields();
    this.errorMessage = '';
  }

  clearFormFields() {
    this.email = '';
    this.password = '';
    this.username = '';
    this.profilePicture = null;
  }

  onSubmit() {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Ambos campos son obligatorios.';
      return;
    }

    this.http
      .post('http://127.0.0.1:8000/api/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe(
        () => console.log('Inicio de sesión exitoso'),
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorMessage = 'Gmail o contraseña inválidos.';
          } else {
            console.error('Error al iniciar sesión:', error);
          }
        }
      );
  }

  onRegister() {
    this.errorMessage = '';
    if (
      !validateUsername(this.username) ||
      !validateEmail(this.email) ||
      !validatePassword(this.password)
    ) {
      this.errorMessage = 'Error en los datos proporcionados.';
      return;
    }

    if (this.profilePicture && !validateProfilePicture(this.profilePicture)) {
      this.errorMessage = 'La imagen debe estar en formato .jpg, .png o .img.';
      return;
    }

    this.http.get<any[]>('http://127.0.0.1:8000/api/usuarios').subscribe(
      (usuarios) => {
        const userExists = usuarios.some((user) => user.email === this.email);
        if (userExists) {
          this.errorMessage = 'Gmail ya registrado.';
        } else {
          const user = {
            username: this.username,
            email: this.email,
            password: this.password,
            imagen: this.profilePicture ? this.profilePicture.name : '',
          };
          this.http.post('http://127.0.0.1:8000/api/usuarios', user).subscribe(
            () => {
              console.log('Usuario registrado exitosamente:', user);
              this.clearFormFields();
            },
            (error: HttpErrorResponse) => {
              console.error('Error en la solicitud de registro:', error);
              this.errorMessage =
                'Error al registrar usuario. Por favor, intenta nuevamente.';
            }
          );
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error en la solicitud GET de usuarios:', error);
        this.errorMessage = 'Error al verificar usuarios. Intente más tarde.';
      }
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
