import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { errorNotification } from '@helpers/.';
import { NotificationService } from '@services/notifications';
import { LoginData, User } from '@models/security';

/**
 * This service is used to send requests about user.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL_USERS: string;

  constructor(
      private httpClient: HttpClient,
      private notificationService: NotificationService
  ) {
    this.URL_USERS = environment.URL_API + 'v1/users/';
  }

  /**
   * Get a JSON array of all users from API.
   */
  index(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.URL_USERS);
  }

  /**
   * Send a request to create a user.
   * @param user User you want to create.
   */
  create(user: LoginData): Observable<User> {
    return this.httpClient.post<any>(this.URL_USERS, user)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }), tap(() => {
          this.notificationService.success('Se ha creado el usuario');
        }));
  }

  /**
   * Send a request to get a user by ID.
   * @param id ID of user you want to show.
   */
  show(id: number): Observable<User> {
    return this.httpClient.get<User>(this.URL_USERS + id)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }));
  }

  /**
   * Send a request to change password for current user.
   * @param user New password you want to use.
   */
  changePassword(user: any): Observable<any> {
    return this.httpClient.put<any>(this.URL_USERS + 'change-password', user)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }), tap(() => {
          this.notificationService.success('Se ha actualizado la contraseña');
        }));
  }

  /**
   * Send a request to verify if password in a form match with the password of the current user.
   * @param password Password you want to verify if match.
   */
  matchPassword(password: string): Observable<any> {
    return this.httpClient.get<any>(this.URL_USERS + 'match-password/' + password)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }));
  }

}
