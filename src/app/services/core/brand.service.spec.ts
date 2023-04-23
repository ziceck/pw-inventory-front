/* tslint:disable:no-string-literal */
import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Brand } from '@models/core';

describe('BrandService', () => {

  let service: BrandService;

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
        BrowserAnimationsModule
      ]
    });
    service = TestBed.inject(BrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create', () => {
    const mockBrand: Brand = {id: null, name: 'General'};
    const spy = spyOn(service['httpClient'], 'post').and.returnValue(of(mockBrand));
    const spyNotification = spyOn(service['notificationService'], 'success');
    service.create(mockBrand).subscribe(value => {
      expect(value.name === mockBrand.name).toBeTrue();
    });
    expect(spyNotification).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('update', () => {
    const mockBrand: Brand = {id: null, name: 'General'};
    const spy = spyOn(service['httpClient'], 'put').and.returnValue(of(mockBrand));
    service.update(mockBrand).subscribe(value => {
      expect(value.name === mockBrand.name).toBeTrue();
    });
    expect(spy).toHaveBeenCalled();
  });

});
