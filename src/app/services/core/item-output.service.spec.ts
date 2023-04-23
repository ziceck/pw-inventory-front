/* tslint:disable:no-string-literal */
import { TestBed } from '@angular/core/testing';

import { ItemOutputService } from './item-output.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { of } from 'rxjs';
import { ItemOutput } from '@models/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemOutputService', () => {

  let service: ItemOutputService;

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

    service = TestBed.inject(ItemOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create', () => {
    const mockItemOutput: ItemOutput = {
      dateCreated: undefined,
      description: '',
      item: undefined,
      quantity: 0,
      id: undefined
    };
    const spy = spyOn(service['httpClient'], 'post').and.returnValue(of(mockItemOutput));
    service.create(mockItemOutput).subscribe(value => {
      expect(value.quantity === mockItemOutput.quantity).toBeTrue();
    });
    expect(spy).toHaveBeenCalled();
  });

});
