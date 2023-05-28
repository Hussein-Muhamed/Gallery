import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../Servecis/auth.service';
@Injectable({
  providedIn: 'root',
})

export class landingGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate([`/`]);
      return false ;
    }
  }
}
