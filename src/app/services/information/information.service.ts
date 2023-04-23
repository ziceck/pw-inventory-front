import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * This service is used to get information displayed in dashboard.
 */
@Injectable({
  providedIn: 'root'
})
export class InformationService {

  private readonly URL_INFORMATION: string;

  constructor(private httpClient: HttpClient) {
    this.URL_INFORMATION = environment.URL_API + 'v1/information/';
  }

  /**
   * Send a request to get information displayed in dashboard.
   */
  dashboard(): Observable<any> {
    return this.httpClient.get<any>(this.URL_INFORMATION + 'dashboard');
  }

}
