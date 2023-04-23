/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { SaleService } from '@services/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { item } from '@mocks/constants-mocks';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let notificationService: NotificationService;
  let saleService: SaleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      providers: [
        SaleService,
        FormBuilder,
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    notificationService = TestBed.inject(NotificationService);
    saleService = TestBed.inject(SaleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createFgItemSale', () => {
    const mockItem = {
      id: 1,
      name: 'Test',
      priceSale: 23.45,
      pricePurchase: 45.3,
      minimum: 40,
      dateCreated: new Date(),
      user: null,
      category: null,
      quantity: 2
    };
    const a = component['createFgItemSale'](mockItem);
    expect(a).toBeTruthy();
  });

  it('updateDataSource', () => {
    const spy = spyOn(component.dataSource, 'next').and.callFake(() => {
    });
    component['updateDataSource']();
    expect(spy).toHaveBeenCalled();
  });

  it('onSubmit and openDialog', () => {
    const spyOpenDialog = spyOn(component, 'openMatDialog');
    component.onSubmit();
    expect(spyOpenDialog).toHaveBeenCalled();
  });

  it('onSubmit and notification error', () => {
    component.items.push(component['createFgItemSale'](item));
    const spyNotification = spyOn(notificationService, 'error');
    component.onSubmit();
    expect(spyNotification).toHaveBeenCalled();
    const fg = component['createFgItemSale'](item);
    expect(fg).toBeTruthy();
  });

  it('onItem', () => {
    const spyAddItem = spyOn<any>(component, 'addItem');
    const spyWarning = spyOn(notificationService, 'warning');
    component.onItem(item);
    expect(spyAddItem).toHaveBeenCalled();
    item.quantity = 0;
    component.onItem(item);
    expect(spyWarning).toHaveBeenCalled();
  });

  it('createSale', () => {
    const ticket = {total: 22, recibido: 22, cambio: 22, sale: 2};
    const spyCreate = spyOn(saleService, 'create').and.returnValue(of({
      id: 2,
      description: '',
      dateCreated: new Date(),
      user: null,
      items: []
    }));
    component['createSale'](ticket);
    expect(spyCreate).toHaveBeenCalled();
  });

});
