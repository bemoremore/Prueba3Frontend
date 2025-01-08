import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuth = this.jwtService.isAuthenticated();
    console.log('Guard checking auth state for path:', state.url);
    console.log('Authentication state:', isAuth ? 'authenticated' : 'not authenticated');

    if (!isAuth) {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Usuario no autenticado, redirigiendo a login',
      });
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
