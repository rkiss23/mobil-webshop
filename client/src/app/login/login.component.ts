
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData.username, this.loginData.password).subscribe(
      (response) => {
        if (response && response.token) {
          this.successMessage = 'Sikeres bejelentkezés!';
          this.errorMessage = null;
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Helytelen email vagy jelszó.';
          this.successMessage = null;
        }
      },
      (error) => {
        this.errorMessage = 'Hiba történt a bejelentkezés során.';
        this.successMessage = null;
      }
    );
  }
}
