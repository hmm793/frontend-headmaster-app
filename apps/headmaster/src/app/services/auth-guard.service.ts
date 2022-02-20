import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  router_role: any;
  constructor(
    private router: Router,
    private localstorageService: LocalstorageService
  ) {}
  canActivate(actRoute: ActivatedRouteSnapshot): boolean {
    const isTokenExist = this.localstorageService.getToken();

    if (isTokenExist) {
      const decodedToken = JSON.parse(atob(isTokenExist?.split('.')[1] || ''));
      this.router_role = actRoute.data['role'];
      if (this.router_role == decodedToken.role) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
