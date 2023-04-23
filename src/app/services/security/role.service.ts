import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '@models/security';

/**
 * This service is used to send request about role.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly URL_ROLES: string;

  constructor(
      private httpClient: HttpClient
  ) {
    this.URL_ROLES = environment.URL_API + 'v1/roles/';
  }

  /**
   * Get a JSON array of all roles from API.
   */
  index(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.URL_ROLES);
  }

}
