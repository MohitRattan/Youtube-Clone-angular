import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('signupUser');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
