import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.jwtService.getToken();
    if (!token) {
      alert('Debe iniciar sesión');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
    
  }
}
