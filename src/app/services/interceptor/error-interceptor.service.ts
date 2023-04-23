import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '@services/security';

/**
 * Intercept request with error 401 or 403.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  /**
   * Intercept all request to verify if they have errors.
   * @param request Request intercepted.
   * @param next Next action.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.handleError(error)));
  }

  /**
   * If back respond no allowed close current session.
   * @param err Error from API.
   */
  private handleError(err: any): Observable<any> {
    if (this.notAllowed(err)) {
      this.loginService.logout();
    }
    // const error = err.error.message || err.statusText;
    return throwError(err);
  }

  /**
   * Return true if error is 401 or 403.
   * @param err Error from request.
   */
  private notAllowed(err: any): boolean {
    const message = err.error.message ? err.error.message : '';
    return err.status === 401 || (err.status === 403 && message.indexOf('Se requiere el rol') !== -1);
  }

}
