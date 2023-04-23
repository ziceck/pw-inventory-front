/* tslint:disable:no-string-literal */
import { TestBed } from '@angular/core/testing';
import { SaleService } from '@services/core/sale.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { PersonalInformation, Sale } from '@models/core';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SaleService', () => {

  let saleService: SaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [HttpClientModule, BrowserAnimationsModule]
    });

    saleService = TestBed.inject(SaleService);
  });

  it('should be created', () => {
    expect(saleService).toBeTruthy();
  });

  it('create', () => {
    const mockSale: Sale = {
      id: null,
      dateCreated: new Date(),
      user: null,
      items: [],
      description: 'Description'
    };
    const spy = spyOn(saleService['httpClient'], 'post').and.returnValue(of(mockSale));
    saleService.create(mockSale).subscribe(value => {
      expect(value.description === mockSale.description).toBeTrue();
    });
    expect(spy).toHaveBeenCalled();
  });

  it('reprint ticket', () => {
    const spy = spyOn(saleService['httpClient'], 'get').and.returnValue(of({}));
    saleService.reprintTicket(1).subscribe(value => {
      expect(value).toBeTruthy();
    });
    expect(spy).toHaveBeenCalled();
  });

});
