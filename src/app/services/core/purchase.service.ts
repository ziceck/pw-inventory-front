import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { environment } from '../../../environments/environment';
import { Purchase } from '@models/core';
import { CommonService } from '@services/common/common.service';

/**
 * This service is used to send requests about purchase.
 */
@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends CommonService<Purchase> {

  private readonly URL_PURCHASES: string;

  constructor(
      protected httpClient: HttpClient,
      protected notificationService: NotificationService
  ) {
    super(httpClient, notificationService);
    this.URL_PURCHASES = environment.URL_API + 'v1/purchases/';
  }

  get fullUrl(): string {
    return this.URL_PURCHASES;
  }

}
