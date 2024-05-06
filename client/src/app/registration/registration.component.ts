import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  readonly ApiUrl = "http://localhost:3000/api/";

  registrationData = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };

  successMessage: string | null = null;

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post(this.ApiUrl + 'register', this.registrationData)
      .subscribe(
        (response) => {
          this.successMessage = 'Sikeres regisztráció!';
        },
        (error) => {
          console.error('Hiba történt a regisztráció során:', error);
          this.successMessage = null; 
        }
      );
  }
}
