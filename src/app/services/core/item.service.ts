import { Injectable } from '@angular/core';
import { NotificationService } from '@services/notifications';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '@models/core';
import { catchError, map } from 'rxjs/operators';
import { errorNotification } from '@helpers/.';
import { ItemHistory } from '@models/information';
import { CommonService } from '@services/common/common.service';

/**
 * This service is used to send requests about item.
 */
@Injectable({
  providedIn: 'root'
})
export class ItemService extends CommonService<Item> {

  private readonly URL_ITEMS: string;

  constructor(
      httpClient: HttpClient,
      notificationService: NotificationService
  ) {
    super(httpClient, notificationService);
    this.URL_ITEMS = this.URL + 'items/';
  }

  /**
   * Send a request to find an item by barcode.
   * @param barcode Barcode of the item you want to find.
   */
  showByBarcode(barcode: string): Observable<Item> {
    return this.httpClient.get<Item>(this.URL_ITEMS + 'barcode/' + barcode)
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }));
  }

  /**
   * Send a request to find all item that match with a name.
   * @param name Name to find items that match.
   */
  findByName(name: string): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.URL_ITEMS + 'name/' + name);
  }

  /**
   * Get a history of an item by ID.
   * @param id ID item you want to show history.
   */
  history(id: number): Observable<ItemHistory[]> {
    return this.httpClient.get<ItemHistory[]>(this.URL_ITEMS + id + '/history')
        .pipe(catchError(error => {
          return errorNotification(error.error, this.notificationService);
        }), map((value: ItemHistory[], index) => {
          return value.reverse();
        }));
  }

  get fullUrl(): string {
    return this.URL_ITEMS;
  }

}
