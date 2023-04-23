import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { errorNotification } from '@helpers/error-notification.helper';
import { Item } from '@models/core';
import { Pagination } from '@models/pagination';

/**
 * This common service contains basic CRUD methods.
 */
export abstract class CommonService<T> {

  protected readonly URL: string;

  protected constructor(
      protected httpClient: HttpClient,
      protected notificationService: NotificationService
  ) {
    this.URL = environment.URL_API + 'v1/';
  }

  abstract get fullUrl(): string;

  /**
   * Get a JSON array from API.
   */
  index(pagination?: Pagination): Observable<T[]> {
    const params = new HttpParams({
      fromObject: JSON.parse(JSON.stringify(pagination ?? {}))
    });
    return this.httpClient.get<T[]>(this.fullUrl, {params})
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }));
  }

  /**
   * Send a request to create data.
   * @param data Data you want to create.
   * @param message Message you want to show in tap
   */
  create(data: T, message?: string): Observable<T> {
    return this.httpClient.post<T>(this.fullUrl, data)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }), tap((value: any) => {
          this.notificationService.success(message ?? 'Se ha registrado');
        }));
  }

  /**
   * Send a request to update data.
   * @param data Data you want to update.
   * @param message Message you want to show in tap
   */
  update(data: T, message?: string): Observable<T> {
    return this.httpClient.put<T>(this.fullUrl + (data as any).id, data)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }), tap((value: any) => {
          this.notificationService.success(message ?? 'Se ha actualizado');
        }));
  }

  /**
   * Send a request to get data by ID.
   * @param id ID of data you want to show.
   */
  show(id: number): Observable<T> {
    return this.httpClient.get<T>(this.fullUrl + id)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }));
  }

  /**
   * Send a request to delete data by ID.
   * @param id ID of data you want to delete.
   * @param message Message you want to show in tap
   */
  delete(id: number, message?: string): Observable<T> {
    return this.httpClient.delete<T>(this.fullUrl + id)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }), tap(() => {
          this.notificationService.success(message ?? 'Se ha eliminado');
        }));
  }

}
