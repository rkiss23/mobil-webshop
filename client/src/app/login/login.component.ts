import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      response => {
        this.successMessage = 'Sikeres bejelentkezés!';
        this.errorMessage = null;
        
      },
      error => {
        this.errorMessage = 'Helytelen email vagy jelszó.';
        this.successMessage = null;
      }
    );
  }
}
