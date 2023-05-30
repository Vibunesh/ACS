import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = 'https://final-vy64.onrender.com/token';

  constructor(private http: HttpClient ) {}

  loginUser(email: string, password: string) {
    const credentials = {
      username: email,
      password: password
    };
    
    return this.http.post<any>(this.apiUrl, credentials);
  }
}

export class AuthService {
  private tokenKey = 'authToken';
  private authenticated: boolean = false;
  

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  login() {
    // Perform the login logic and set the authentication status to true
    // Save the authentication token in local storage or session storage
    this.authenticated = true;
  }

  logout() {
    // Perform the logout logic
    // Clear the authentication token from local storage or session storage
    this.authenticated = false;
  }

   isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  
}


