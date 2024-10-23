import { Component } from '@angular/core';

@Component({
  selector: 'app-login-landing',
  templateUrl: './login-landing.component.html',
  styleUrls: ['./login-landing.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Iniciar sesión con:', this.email, this.password);
    // Aquí puedes integrar la autenticación real
  }

  scrollToLogin() {
    document
      .querySelector('.login-side')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
