import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private readonly TOKEN_KEY = 'authToken';
  private tokenSubject: BehaviorSubject<string | null>;
  public token$: Observable<string | null>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Inicializar con el token almacenado
    const initialToken = this.getStoredToken();
    this.tokenSubject = new BehaviorSubject<string | null>(initialToken);
    this.token$ = this.tokenSubject.asObservable();
    
    if (isPlatformBrowser(this.platformId)) {
      // Escuchar cambios en localStorage de otras pestañas
      window.addEventListener('storage', (event) => {
        if (event.key === this.TOKEN_KEY) {
          console.log('Token changed in another tab');
          this.tokenSubject.next(event.newValue);
        }
      });

      // Verificar el token al inicio
      console.log('Initial auth check');
      this.verifyInitialToken();
    }
  }

  private verifyInitialToken(): void {
    const token = this.getStoredToken();
    if (token) {
      console.log('Found existing token on initialization');
      this.tokenSubject.next(token);
    }
  }

  private getStoredToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const token = localStorage.getItem(this.TOKEN_KEY);
        console.log('Retrieved token from storage:', token ? 'exists' : 'null');
        return token;
      } catch (e) {
        console.error('Error accessing localStorage:', e);
        return null;
      }
    }
    return null;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      console.log('Getting current token:', token ? 'exists' : 'null');
      return token;
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        console.log('Setting new token');
        localStorage.setItem(this.TOKEN_KEY, token);
        this.tokenSubject.next(token);
      } catch (e) {
        console.error('Error setting token:', e);
      }
    }
  }

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        console.log('Clearing token');
        localStorage.removeItem(this.TOKEN_KEY);
        this.tokenSubject.next(null);
      } catch (e) {
        console.error('Error clearing token:', e);
      }
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const isAuth = !!token;
    console.log('Checking authentication:', isAuth);
    return isAuth;
  }

}