import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  admin: any;
  UserId: any;
  constructor() {}
  login(admin: any, userId?: any) {
    this.admin = admin;
    this.UserId = userId;
    this.isLoggedIn = true ; 
  }
  logout()
  {
   this.isLoggedIn = false ; 
  }
  isAuthenticated() {
    return this.isLoggedIn;
  }
}
