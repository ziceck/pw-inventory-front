import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { errorNotification } from '@helpers/error-notification.helper';

/**
 * This service is used to send requests about user-role.
 */
@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private readonly URL_USERS_ROLES: string;

  constructor(
      private httpClient: HttpClient,
      private notificationService: NotificationService
  ) {
    this.URL_USERS_ROLES = environment.URL_API + 'v1/users-roles';
  }

  /**
   * Send a request to create a user-role
   * @param userRole UserRole you want to create.
   */
  create(userRole: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_USERS_ROLES, userRole)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }));
  }

}
