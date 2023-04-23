/* tslint:disable:no-string-literal */
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { ItemService } from '@services/core/item.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { item, items, itemWithoutId } from '@mocks/constants-mocks';

describe('ItemService', () => {

  let itemService: ItemService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    });

    itemService = TestBed.inject(ItemService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(itemService).toBeTruthy();
  });

  it('create', () => {
    const spy = spyOn(itemService['httpClient'], 'post').and.returnValue(of(item));
    itemService.create(itemWithoutId).subscribe(value => {
      expect(value.name === item.name).toBeTrue();
    });
    expect(spy).toHaveBeenCalled();
  });

  it('update', () => {
    const spy = spyOn(itemService['httpClient'], 'put').and.returnValue(of(item));
    itemService.update(item).subscribe(value => {
      expect(value.name === item.name);
    });
    expect(spy).toHaveBeenCalled();
  });

  it('show by name', () => {
    const spy = spyOn(itemService['httpClient'], 'get').and.returnValue(of(items));
    itemService.findByName('Test').subscribe(value => {
      expect(value.length === 1);
    });
    expect(spy).toHaveBeenCalled();
  });

  it('show by name should be a GET method', () => {
    itemService.findByName('Test').subscribe(value => {
      expect(value.length === 1);
    });
    const testRequest = httpTestingController.expectOne(itemService['URL_ITEMS'] + 'name/Test');
    testRequest.flush(of(items));
    expect(testRequest.request.method).toEqual('GET');
  });

});
