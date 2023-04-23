import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { Brand } from '@models/core';
import { CommonService } from '@services/common/common.service';
import { Pagination } from '@models/pagination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends CommonService<Brand> {

  private readonly URL_BRANDS;

  constructor(
      protected httpClient: HttpClient,
      protected notificationService: NotificationService
  ) {
    super(httpClient, notificationService);
    this.URL_BRANDS = this.URL + 'brands/';
  }

  index(pagination?: Pagination): Observable<Brand[]> {
    return super.index(pagination ?? {sort: 'name'});
  }

  get fullUrl(): string {
    return this.URL_BRANDS;
  }

}
