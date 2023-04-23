import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Jwt, LoginData } from '@models/security';
import { Observable } from 'rxjs';

/**
 * This services send requests to login and refresh token, also logout session.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  storageService: StorageService;
  private readonly URL_LOGIN: string;
  private readonly URL_REFRESH_TOKEN: string;

  constructor(
      private http: HttpClient,
      private router: Router
  ) {
    this.storageService = new StorageService();
    this.URL_LOGIN = environment.URL_API + 'login';
    this.URL_REFRESH_TOKEN = environment.URL_API + 'oauth';
  }

  /**
   * Send a request to log in a user.
   * @param loginData Username and password.
   */
  login(loginData: LoginData): Observable<Jwt> {
    return this.http.post<Jwt>(this.URL_LOGIN, loginData, /*{
      withCredentials: true
    }*/).pipe(map(user => {
      this.storageService.setCurrentUser(JSON.stringify(user));
      return user;
    }));
  }

  /**
   * Clean local storage and redirect to login view.
   */
  logout(): void {
    localStorage.clear(); // elimina todos los datos guardados en el localstorage
    this.router.navigate(['/login']).then(() => {
    });
  }

  /**
   * Send a request to refresh JWT token.
   */
  refreshToken(): Observable<Jwt> {
    const params = new HttpParams({
      fromObject: {grant_type: 'refresh_token', refresh_token: this.storageService.getCurrentUser().refresh_token}
    });
    return this.http.post<Jwt>(this.URL_REFRESH_TOKEN, {}, {params})
        .pipe(map(user => {
          this.storageService.setCurrentUser(JSON.stringify(user));
          return user;
        }));
  }

}
