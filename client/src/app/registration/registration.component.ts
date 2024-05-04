import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  readonly ApiUrl="http://localhost:3000/api/"

  registrationData = {
    email: '',
    password: '',
    password_again: ''
  };
  
  constructor(private http: HttpClient) { }

  onSubmit() {

    this.http.post(this.ApiUrl + 'registration', this.registrationData)
      .subscribe(
        (response) => {
          console.log('Sikeres regisztráció!', response);
        },
        (error) => {
          console.error('Hiba történt a regisztráció során:', error);
        }
      );
  }
}
