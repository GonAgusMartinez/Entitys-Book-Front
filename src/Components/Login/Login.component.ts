import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <div class="login-container">
      <form (ngSubmit)="onSubmit()">
        <h2>Iniciar Sesión</h2>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          [(ngModel)]="email"
          name="email"
          required
        />
        <label for="password">Contraseña</label>
        <input
          id="password"
          type="password"
          [(ngModel)]="password"
          name="password"
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,
  styleUrls: ['./Login.component.scss'],
  imports: [FormsModule], // Importa FormsModule explícitamente
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Iniciar sesión con:', this.email, this.password);
  }
}
