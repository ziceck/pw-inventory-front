import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { environment } from '../../../environments/environment';
import { Category } from '@models/core';
import { CommonService } from '@services/common/common.service';
import { Pagination } from '@models/pagination';
import { Observable } from 'rxjs';

/**
 * This service is to send requests about category.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CommonService<Category> {

  private readonly URL_CATEGORIES;

  constructor(
      protected httpClient: HttpClient,
      protected notificationService: NotificationService
  ) {
    super(httpClient, notificationService);
    this.URL_CATEGORIES = environment.URL_API + 'v1/categories/';
  }

  index(pagination?: Pagination): Observable<Category[]> {
    return super.index(pagination ?? {sort: 'name'});
  }

  get fullUrl(): string {
    return this.URL_CATEGORIES;
  }

}
