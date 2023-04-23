import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

/**
 * This service is to upload and download a file.
 */
@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly URL_FILES;

  constructor(
      private httpClient: HttpClient
  ) {
    this.URL_FILES = environment.URL_API + 'v1/files/';
  }

  /**
   * Send a request to create a file.
   * @param data Data of file you want to create.
   */
  create(data: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_FILES, data)
        .pipe(catchError(error => {
          return throwError(error.error.messsage);
        }));
  }

  /**
   * Download a file by ID.
   * @param id ID file you want to download.
   */
  show(id: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_FILES + id, {responseType: 'blob' as 'json'});
  }

}
