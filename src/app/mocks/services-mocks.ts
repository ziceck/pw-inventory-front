import { Injectable } from '@angular/core';
import { ItemService } from '@services/core';
import { Observable, of } from 'rxjs';
import { Item } from '@models/core';
import { CommonService } from '@services/common/common.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '@services/notifications';

@Injectable()
export class ItemServiceMockup extends ItemService {

  show(id: number): Observable<Item> {
    return of({
      id: 1,
      barcode: '24234',
      name: 'Item 1',
      quantity: 2,
      pricePurchase: 2.2,
      priceSale: 3.2,
      minimum: 3,
      user: null,
      dateCreated: new Date(),
      category: {
        id: 1, name: 'Soda', updateable: true,
        deleteable: true
      }
    });
  }

}

@Injectable()
export class CommonServiceMock extends CommonService<any> {

  constructor(
      httpClient: HttpClient,
      notificationService: NotificationService
  ) {
    super(httpClient, notificationService);
  }

  get fullUrl(): string {
    return '/tests';
  }

}
