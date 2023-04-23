import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ItemOutput } from '@models/core';
import { NotificationService } from '@services/notifications';
import { CommonService } from '@services/common/common.service';

/**
 * This service is used to send requests about item-outputs.
 */
@Injectable({
  providedIn: 'root'
})
export class ItemOutputService extends CommonService<ItemOutput> {

  private readonly URL_ITEMS_OUTPUTS: string;

  constructor(
      protected httpClient: HttpClient,
      protected notificationService: NotificationService
  ) {
    super(httpClient, notificationService);
    this.URL_ITEMS_OUTPUTS = environment.URL_API + 'v1/items-outputs';
  }

  get fullUrl(): string {
    return this.URL_ITEMS_OUTPUTS;
  }

}
