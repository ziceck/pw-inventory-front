import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '@services/security';

/**
 * Intercept request to add Bearer token
 */
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
      private router: Router,
      private loginService: LoginService
  ) {
  }

  /**
   * Intercept all requests and add bearer token.
   * @param req Request intercepted.
   * @param next Next action.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.loginService.storageService.getCurrentUser();
    const token: string = currentUser ? currentUser.access_token : null;
    if (token) {
      req = req.clone({
        withCredentials: true,
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }

}
