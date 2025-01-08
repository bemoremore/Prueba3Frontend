import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router);

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          localStorage.clear();
          router.navigate(['/login'], { queryParams: { message: 'Sesión expirada' } });
        }
        return throwError(error);
      })
    );
  }
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.clear();
        router.navigate(['/login'], { queryParams: { message: 'Sesión expirada' } });
      }
      return throwError(error);
    })
  );
};
