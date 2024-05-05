import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
    private apiUrl = 'http://localhost:3000/api';
  
    constructor(private http: HttpClient) {
      this.isAuthenticatedSubject.next(!!this.getToken());
    }
  
    login(email: string, password: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
        .pipe(map(response => {
          if (response && response.token) {
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem('currentUser', JSON.stringify(response));
            }
            this.isAuthenticatedSubject.next(true);
          }
          return response;
        }));
    }
  
    logout() {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('currentUser');
      }
      this.isAuthenticatedSubject.next(false);
    }
  
    getToken(): string | null {
      if (typeof window !== 'undefined' && window.localStorage) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return currentUser?.token || null;
      }
      return null;
    }
  
    isLoggedIn(): boolean {
      return !!this.getToken();
    }
  }
  